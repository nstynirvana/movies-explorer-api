const Movie = require('../models/movie');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/errors');
const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
} = require('../utils/utils');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(SUCCESS_CODE_OK).send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;

    const ownerId = req.user._id;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });

    res.status(SUCCESS_CODE_CREATED).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Неверный формат данных'));
    } else {
      next(err);
    }
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).populate('owner');
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    const ownerId = movie.owner.id;
    const userId = req.user._id;

    if (ownerId !== userId) {
      throw new ForbiddenError('Нельзя удалить чужой фильм');
    }
    await movie.remove();
    res.status(SUCCESS_CODE_OK).send(movie);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new BadRequestError('Неверный формат данных'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
