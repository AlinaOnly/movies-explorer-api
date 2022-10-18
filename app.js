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
const { PORT, MONGODB } = require('./utils/configuration');
const { connectMessage } = require('./utils/constsMessage');

const app = express();

app.use(corsOptions);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(serverError);

async function server() {
  await mongoose.connect(MONGODB, {
    useNewUrlParser: true,
  }).then(() => console.log(connectMessage));

  await app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
}

server();
