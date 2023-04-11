const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const corsOptions = require('./middlewares/cors');
const routes = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');
const NotFoundError = require('./errors/NotFoundError');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb://127.0.0.1:27017/moviesdb',
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  },
);

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use(handleErrors);
