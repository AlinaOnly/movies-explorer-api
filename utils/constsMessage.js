const loginMessage = 'Успешный вход';
const userNotFoundMessage = 'Пользователь с таким id не найден';
const idUserNotFoundMessage = 'Неверный id пользователя';
const conflictEmailMessage = 'Такой пользователь уже существует';
const invalidDataMessage = 'Некорректные данные';
const invalidUserDataMessage = 'Переданы некорректные данные о пользователе';

const conflictMovieMessage = 'Такой фильм уже есть';
const invalidMovieDataMessage = 'Переданы некорректные данные для создания фильма';
const movieNotFoundMessage = 'Фильм с таким id не найден';
const movieDeleteMessage = 'Ваш фильм удален';
const restMovieDeleteMessage = 'Вы не можете удалять чужие фильмы';

const incorrectEmailOrPassMessage = 'Неправильный пароль или почта';
const incorrectEmailMessage = 'Неправильная почта';
const incorrectUrlMessage = 'Неправильная ссылка';

const logoutMessage = 'Выход';
const notFoundMessage = 'Нет такой страницы';
const connectMessage = 'Connected to mongodb';

const authNeedMessage = 'Необходима авторизация';
const tokenErrMessage = 'Неверный токен';

const serverErrorMessage = 'Ошибка на сервере';

// const regEx = /^https?:\/\/(www\.)?.[\w\-.+[\]()_~:/%?#@!$&'*,;=]*$/;

module.exports = {
  loginMessage,
  userNotFoundMessage,
  idUserNotFoundMessage,
  conflictEmailMessage,
  invalidDataMessage,
  invalidUserDataMessage,
  conflictMovieMessage,
  invalidMovieDataMessage,
  movieNotFoundMessage,
  movieDeleteMessage,
  restMovieDeleteMessage,
  incorrectEmailOrPassMessage,
  incorrectUrlMessage,
  logoutMessage,
  notFoundMessage,
  connectMessage,
  authNeedMessage,
  tokenErrMessage,
  incorrectEmailMessage,
  serverErrorMessage,
};
