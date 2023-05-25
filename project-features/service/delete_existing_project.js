const { sequelize } = require("../../utilities/db");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");

const { Project } = require("../model");

const deleteExistingProject = async (req) => {
  const { id } = req.params;

  const project = await Project.findByPk(id, {
    attributes: [
      "id",
      "title",
      "status",
      "fee",
      "deadline",
      "latitude",
      "longitude",
    ],
  });

  if (!project) {
    const err = new ErrorDetails("ProjectError", "project", "project not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  await project.destroy();

  return;
}

module.exports = deleteExistingProject;
