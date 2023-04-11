const express = require('express');

const movieRouter = express.Router(); // создали роутер

const { celebrate, Joi } = require('celebrate');

const { validateSchema } = require('../utils/validateSchema');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validateSchema),
      trailerLink: Joi.string().required().custom(validateSchema),
      thumbnail: Joi.string().required().custom(validateSchema),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

movieRouter.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovieById,
);

module.exports = movieRouter; // экспортировали роутер
