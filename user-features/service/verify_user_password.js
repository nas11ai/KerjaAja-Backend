const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const bcrypt = require("bcrypt");

const { User } = require("../model");

const verifyUserPassword = async (req) => {
  if (!req.body.checked_password) {
    const err = new ErrorDetails("ChangePasswordError", "checked_password", "checked_password must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof req.body.checked_password !== 'string') {
    const err = new ErrorDetails("ChangePasswordError", "checked_password", "checked_password must be string");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const user = await User.findOne({ where: { username: req.params.username } });

  if (!user) {
    const err = new ErrorDetails("ChangePasswordError", "user", "user not found");
    console.error(err); // TODO: ganti console ke log kalau sudah mau production
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  const passwordExists = user
    ? await bcrypt.compare(req.body.checked_password, user.password_hash)
    : false;

  if (!passwordExists) {
    const err = new ErrorDetails("LoginFormError", "checked_password", "checked_password is wrong");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  return
}

module.exports = verifyUserPassword;
