const mongoose = require('mongoose');

const { validateSchema } = require('../utils/validateSchema');

const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: { validator: validateSchema, message: 'Неккоректный url' },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: validateSchema, message: 'Неккоректный url' },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: validateSchema, message: 'Неккоректный url' },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', MovieSchema);
