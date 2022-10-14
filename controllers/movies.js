const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getMoviesById = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.find({ movieId, owner: req.user._id })
    .then((createMovie) => {
      if (createMovie.length !== 0) {
        return next(new ConflictError('Такой фильм уже есть'));
      }
      return Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        owner: req.user._id,
        movieId,
        nameRU,
        nameEN,
      }).then((movie) => res.send(movie))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные для создания фильма'));
          } else {
            next(err);
          }
        });
    }).catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким id не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }
      return movie.remove();
    })
    .then(() => res.send({ message: 'Ваш фильм удален' }))
    .catch(next);
};
