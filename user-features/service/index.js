const login = require("./login");
const register = require("./register");
const getExistingUser = require("./get_existing_user");
const updateUserPhoto = require("./update_user_photo");
const changeUserPassword = require("./change_user_password");
const changeUserUsername = require("./change_user_username");
const verifyUserPassword = require("./verify_user_password");

module.exports = { login, register, getExistingUser, updateUserPhoto, changeUserPassword, changeUserUsername, verifyUserPassword };
