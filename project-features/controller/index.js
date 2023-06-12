const createNewProjectRouter = require("./create");
const getExistingProjectRouter = require("./read");
const getUserProjectHistoryRouter = require("./history");
const updateExistingProjectRouter = require("./update");
const deleteExistingProjectRouter = require("./delete");

module.exports = { createNewProjectRouter, getExistingProjectRouter, getUserProjectHistoryRouter, updateExistingProjectRouter, deleteExistingProjectRouter };
