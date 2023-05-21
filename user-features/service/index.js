const login = require("./login");
const register = require("./register");
const updateUserPhoto = require("./update_user_photo");
const changeUserPassword = require("./change_user_password");
const changeUserUsername = require("./change_user_username");
const verifyUserPassword = require("./verify_user_password");

module.exports = { login, register, updateUserPhoto, changeUserPassword, changeUserUsername, verifyUserPassword };
