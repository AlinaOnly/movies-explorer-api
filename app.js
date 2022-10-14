require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const corsOptions = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/serverError');
const router = require('./routes');

const { PORT = 4000 } = process.env;
const app = express();

app.use(corsOptions);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

/* app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */ // удаление после первого ревью

app.use(errorLogger);
app.use(errors());

app.use(serverError);

async function server() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  }).then(() => console.log('Connected to mongodb'));

  await app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
}

server();
