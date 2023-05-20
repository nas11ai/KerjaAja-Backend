const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { User } = require("../model");
const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
} = require("../../utilities/config");

const login = async (req) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    const err = new ErrorDetails("LoginFormError", "username", "username is wrong");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const passwordExists = user
    ? await bcrypt.compare(req.body.password, user.password_hash)
    : false;

  if (!passwordExists) {
    const err = new ErrorDetails("LoginFormError", "password", "password is wrong");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const newAccessToken = jwt.sign({
    userId: user.id,
    userRole: user.role,
    username: user.username,
  }, ACCESS_TOKEN_SECRET, {
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    //TODO: Change to 10 minute when production
    expiresIn: '10m',
    // expiresIn: '1m',
  });

  const newRefreshToken = jwt.sign({
    userId: user.id,
  }, REFRESH_TOKEN_SECRET, {
    jwtid: crypto.randomUUID(),
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    //TODO: Change to 1 day when production
    expiresIn: '1d',
    // expiresIn: '15m',
  });

  return {
    newAccessToken,
    newRefreshToken,
    userRole: user.role,
  };
}

module.exports = login;
