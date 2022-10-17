require('dotenv').config();

const {
  PORT = 4000,
  MONGODB = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'dev-secret',
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  PORT, MONGODB, JWT_SECRET, NODE_ENV,
};
