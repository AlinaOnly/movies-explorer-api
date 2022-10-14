require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = cookie.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new UnauthorizedError('Неверный токен');
  }

  req.user = payload;

  next();
};
