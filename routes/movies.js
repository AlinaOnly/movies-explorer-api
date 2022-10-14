const router = require('express').Router();
const { createMovieValidation, movieIdValidation } = require('../middlewares/validation');

const { getMoviesById, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMoviesById);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
