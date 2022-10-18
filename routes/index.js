const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
const { notFoundMessage, logoutMessage } = require('../utils/constsMessage');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.delete('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: logoutMessage });
}); // очистка куки

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', () => {
  throw new NotFoundError(notFoundMessage);
});

module.exports = router;
