const bcrypt = require("bcrypt");

const { User } = require("../model");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");

const register = async (req) => {
  const { username, fullname, role, password, gender } = req.body;

  if (!username) {
    const err = new ErrorDetails("RegisterError", "username", "username must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  const user = await User.findOne({ where: { username } });

  if (user) {
    const err = new ErrorDetails("RegisterError", "username", "username has been taken");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  if (!fullname) {
    const err = new ErrorDetails("RegisterError", "fullname", "fullname must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  if (!role) {
    const err = new ErrorDetails("RegisterError", "role", "role must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  if (!password) {
    const err = new ErrorDetails("RegisterError", "password", "password must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  if (!gender) {
    const err = new ErrorDetails("RegisterError", "gender", "gender must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  try {
    await User.create({ username, fullname, role, gender, password_hash });
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);

    const err = {};
    if (error.name === "SequelizeUniqueConstraintError") {
      err.username = "username has been taken";
      throw new ErrorResponse(400, "BAD_REQUEST", err);
    }

    if (error.name === "SequelizeDatabaseError") {
      err.role = "role must be between (superadmin)/(admin)/(user)";
      throw new ErrorResponse(400, "BAD_REQUEST", err);
    }
  }

  return;
}

module.exports = register;
