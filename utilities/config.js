require('dotenv').config();

module.exports = {
  API_VERSION: process.env.API_VERSION,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  // DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  TOKEN_ALGORITHM: process.env.TOKEN_ALGORITHM,
  TOKEN_ISSUER: process.env.TOKEN_ISSUER,
  TOKEN_AUDIENCE: process.env.TOKEN_AUDIENCE,
};