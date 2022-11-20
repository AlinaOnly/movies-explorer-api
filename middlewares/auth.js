require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { authNeedMessage, tokenErrMessage } = require('../utils/constsMessage');

module.exports = (req, res, next) => {
  // const cookie = req.cookies;
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError(authNeedMessage);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    if (payload) {
      req.user = payload;
    }
  } catch (err) {
    throw new UnauthorizedError(`${tokenErrMessage} ${err}`);
  }
  next();
};
