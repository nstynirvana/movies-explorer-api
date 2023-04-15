const express = require('express');

const userRouter = express.Router(); // создали роутер

const { celebrate, Joi } = require('celebrate');

const {
  updateUser,
  getInfoUser,
} = require('../controllers/users');

userRouter.get('/me', getInfoUser);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser,
);

module.exports = userRouter; // экспортировали роутер
