const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");

const { User } = require("../model");

const changeUserUsername = async (req) => {

  if (!req.body.new_username) {
    const err = new ErrorDetails("ChangePasswordError", "new_username", "new_username must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof req.body.new_username !== 'string') {
    const err = new ErrorDetails("ChangePasswordError", "new_username", "new_username must be string");
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

  user.username = req.body.new_username;

  try {
    await user.save();
  } catch (error) {
    throw error;
  }
}

module.exports = changeUserUsername;
