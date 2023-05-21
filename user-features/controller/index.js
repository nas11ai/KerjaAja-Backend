const loginRouter = require("./login");
const registerRouter = require("./register");
const updateUserPhotoRouter = require("./update_user_photo");
const changeUserPasswordRouter = require("./change_user_password");
const changeUserUsernameRouter = require("./change_user_username");
const verifyUserPasswordRouter = require("./verify_user_password");

module.exports = {
  loginRouter,
  registerRouter,
  updateUserPhotoRouter,
  changeUserPasswordRouter,
  changeUserUsernameRouter,
  verifyUserPasswordRouter,
};
