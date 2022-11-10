const corsList = [
  'https://api.nomoreparties.co/beatfilm-movies',
  'https://api.trenikovamovies.nomoredomains.icu',
  'http://api.trenikovamovies.nomoredomains.icu',
  'https://trenikovamovies.nomoredomains.icu',
  'http://trenikovamovies.nomoredomains.icu',
  'http://localhost:4000',
  'https://localhost:4000'];

const corsOptions = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (corsList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = corsOptions;
