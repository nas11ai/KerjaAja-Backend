const connecttoChatRouter = require("../index");
const getUnreadMessagesRouter = require("./unread");
const readMessagesRouter = require("./read");
const deleteMessagesRouter = require("./delete");

module.exports = {
    connecttoChatRouter,
    getUnreadMessagesRouter,
    readMessagesRouter,
    deleteMessagesRouter
};