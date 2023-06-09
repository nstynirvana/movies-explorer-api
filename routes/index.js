const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);

routes.use(auth);

routes.post('/signout', signOut);

routes.use('/users', userRouter);
routes.use('/movies', movieRouter);

routes.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
