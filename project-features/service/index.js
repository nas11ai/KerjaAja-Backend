const createNewProject = require("./create_new_project");
const getExistingProject = require("./get_existing_project");
const getExistingProjectByUsername = require("./get_existing_project_by_username");
const updateExistingProject = require("./update_existing_project");
const deleteExistingProject = require("./delete_existing_project");

module.exports = { createNewProject, getExistingProject, getExistingProjectByUsername, updateExistingProject, deleteExistingProject };
