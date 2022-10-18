require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const {
  loginMessage,
  userNotFoundMessage,
  idUserNotFoundMessage,
  conflictEmailMessage,
  invalidDataMessage,
  invalidUserDataMessage,
} = require('../utils/constsMessage');

module.exports.getUserId = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(userNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(idUserNotFoundMessage));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      }).then((data) => res.send({
        name: data.name,
        email: data.email,
        _id: data._id,
      }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError(conflictEmailMessage));
          }
          if (err.name === 'ValidationError') {
            return next(new BadRequestError(invalidDataMessage));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports.changeUserInformation = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(() => new NotFoundError(userNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(conflictEmailMessage));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: loginMessage });
    }).catch(next);
};
