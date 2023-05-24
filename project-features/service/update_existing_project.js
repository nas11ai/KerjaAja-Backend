const { Op } = require('sequelize');
const { sequelize } = require("../../utilities/db");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../../project-category-features/model");

const { ProjectRegion, Project, ProjectCategoryMap } = require("../model");

const updateExistingProject = async (req) => {
  const { title, status, project_fee, deadline, region_name, category_list } = req.body;

  if (!(title || status || project_fee || deadline || region_name || category_list)) {
    const err = new ErrorDetails("ProjectError", "request_body", "request_body must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const { id } = req.params;

  const project = await Project.findByPk(id, {
    attributes: [
      "title",
      "status",
      "fee",
      "deadline",
      "region_id"
    ],
  });

  if (!project) {
    const err = new ErrorDetails("ProjectError", "project", "project not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  if (title) {
    project.title = title;
  }

  if (status) {
    if (!(status === "Open" || status === "In Progress" || status === "Closed")) {
      const err = new ErrorDetails("ProjectError", "status", "status value must be between 'Open' or 'In Progress' or 'Closed'");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    project.status = status;
  }

  if (project_fee) {
    const fee = Number(project_fee);

    if (isNaN(fee)) {
      const err = new ErrorDetails("ProjectError", "project_fee", "project_fee must be number");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    if (fee < 0) {
      const err = new ErrorDetails("ProjectError", "project_fee", "project_fee must not be less than 0");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    project.fee = fee;
  }

  if (deadline) {
    const deadlineRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!(deadlineRegex.test(deadline))) {
      const err = new ErrorDetails("ProjectError", "deadline", "deadline must be within 'YYYY-MM-DD' format");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    project.deadline = deadline;
  }

  await sequelize.transaction(async (t) => {
    if (region_name) {
      let region = await ProjectRegion.findOne({ where: { name: region_name } });

      if (!region) {
        region = await ProjectRegion.create({ name: region_name }, {
          transaction: t,
        });
      }

      project.region_id = region.id;
    }

    project.id = id;

    await project.save({ transaction: t });

    if (category_list) {
      const categories = JSON.parse(category_list);

      if (!(Array.isArray(categories))) {
        const err = new ErrorDetails("ProjectError", "category_list", "category_list must be string of array");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      if (categories.length === 0) {
        const err = new ErrorDetails("ProjectError", "category_list", "category_list must not be empty");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
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
          throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
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
