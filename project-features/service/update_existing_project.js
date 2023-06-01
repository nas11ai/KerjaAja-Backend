const { sequelize } = require("../../utilities/db");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../../project-category-features/model");

const { Project, ProjectCategoryMap } = require("../model");

const updateExistingProject = async (req) => {
  const { title, status, project_fee, deadline, region_latitude, region_longitude, category_list } = req.body;

  if (!(title || status || project_fee || deadline || category_list)) {
    const err = new ErrorDetails("ProjectError", "request_body", "request_body must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

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
    throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
  }

  if (title) {
    project.title = title;
  }

  if (status) {
    if (!(status === "Open" || status === "In Progress" || status === "Closed")) {
      const err = new ErrorDetails("ProjectError", "status", "status value must be between 'Open' or 'In Progress' or 'Closed'");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    project.status = status;
  }

  if (project_fee) {
    const fee = Number(project_fee);

    if (isNaN(fee)) {
      const err = new ErrorDetails("ProjectError", "project_fee", "project_fee must be number");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    if (fee < 0) {
      const err = new ErrorDetails("ProjectError", "project_fee", "project_fee must not be less than 0");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    project.fee = fee;
  }

  if (deadline) {
    const deadlineRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!(deadlineRegex.test(deadline))) {
      const err = new ErrorDetails("ProjectError", "deadline", "deadline must be within 'YYYY-MM-DD' format");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    project.deadline = deadline;
  }

  if (region_latitude) {
    const latitude = parseFloat(region_latitude);

    if (isNaN(latitude)) {
      const err = new ErrorDetails("ProjectError", "region_latitude", "region_latitude must be number");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    project.latitude = latitude;
  }

  if (region_longitude) {
    const longitude = parseFloat(region_longitude);

    if (isNaN(longitude)) {
      const err = new ErrorDetails("ProjectError", "region_longitude", "region_longitude must be number");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    project.longitude = longitude;
  }

  await sequelize.transaction(async (t) => {

    await project.save({ transaction: t });

    if (category_list) {
      const categories = JSON.parse(category_list);

      if (!(Array.isArray(categories))) {
        const err = new ErrorDetails("ProjectError", "category_list", "category_list must be string of array");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
      }

      if (categories.length === 0) {
        const err = new ErrorDetails("ProjectError", "category_list", "category_list must not be empty");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
      }

      await ProjectCategoryMap.destroy({
        where: { project_id: id },
        transaction: t,
      });

      for (const category_name of categories) {
        const category = await ProjectCategory.findOne({ where: { name: category_name } });

        if (!category) {
          const err = new ErrorDetails("ProjectError", "category_list", `category_list item: ${category_name} not found`);
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
        }

        const project_id = id;
        const { id: project_category_id } = category;

        await ProjectCategoryMap.create({ project_id, project_category_id }, {
          transaction: t,
        });
      }
    }

    return;
  });

  return;
}

module.exports = updateExistingProject;
