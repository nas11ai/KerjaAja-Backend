const createNewProjectRouter = require("./create");
const getExistingProjectRouter = require("./read");
const updateExistingProjectRouter = require("./update");
const deleteExistingProjectRouter = require("./delete");

module.exports = { createNewProjectRouter, getExistingProjectRouter, updateExistingProjectRouter, deleteExistingProjectRouter };
