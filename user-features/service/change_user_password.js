const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const bcrypt = require("bcrypt");

const { User } = require("../model");

const changeUserPassword = async (req) => {
  if (!req.body.new_password) {
    const err = new ErrorDetails("ChangePasswordError", "new_password", "new_password must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  if (typeof req.body.new_password !== 'string') {
    const err = new ErrorDetails("ChangePasswordError", "new_password", "new_password must be string");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  const user = await User.findOne({ where: { username: req.params.username } });

  if (!user) {
    const err = new ErrorDetails("ChangePasswordError", "user", "user not found");
    console.error(err); // TODO: ganti console ke log kalau sudah mau production
    throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
  }

  const new_password_hash = await bcrypt.hash(req.body.new_password, 10);

  user.password_hash = new_password_hash;

  try {
    await user.save();
  } catch (error) {
    throw error;
  }
}

module.exports = changeUserPassword;
