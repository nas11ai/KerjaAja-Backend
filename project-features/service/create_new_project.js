const { sequelize } = require("../../utilities/db");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { User } = require("../../user-features/model");
const { ProjectCategory } = require("../../project-category-features/model");

const { ProjectRegion, Project, ProjectCategoryMap } = require("../model");

const createNewProject = async (req) => {
  const { title, status, project_fee, deadline, region_name, owner_username, category_list } = req.body

  if (!title) {
    const err = new ErrorDetails("ProjectError", "title", "title must not be empty");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!status) {
    const err = new ErrorDetails("ProjectError", "status", "status must not be empty");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!(status === "Open" || status === "In Progress" || status === "Closed")) {
    const err = new ErrorDetails("ProjectError", "status", "status value must be between 'Open' or 'In Progress' or 'Closed'");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  let fee = 0;

  if (project_fee) {
    fee = Number(project_fee);

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
  }

  if (!deadline) {
    const err = new ErrorDetails("ProjectError", "deadline", "deadline must not be empty");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const deadlineRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!(deadlineRegex.test(deadline))) {
    const err = new ErrorDetails("ProjectError", "deadline", "deadline must be within 'YYYY-MM-DD' format");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

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

  const user = await User.findOne({ where: { username: owner_username } });

  if (!user) {
    const err = new ErrorDetails("ProjectError", "owner_username", "owner_username not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  const { id: owner_id } = user;

  if (!region_name) {
    const err = new ErrorDetails("ProjectError", "region_name", "region_name must not be empty");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  await sequelize.transaction(async (t) => {
    let region = await ProjectRegion.findOne({ where: { name: region_name } });

    if (!region) {
      region = await ProjectRegion.create({ name: region_name }, {
        transaction: t,
      });
    }

    const { id: region_id } = region;

    const project = await Project.create({ title, status, fee, deadline, region_id, owner_id }, {
      transaction: t,
    });

    const { id: project_id } = project;

    for (const category_name of categories) {
      const category = await ProjectCategory.findOne({ where: { name: category_name } });

      if (!category) {
        const err = new ErrorDetails("ProjectError", "category_list", `category_list item: ${category_name} not found`);
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
      }

      const { id: project_category_id } = category;

      await ProjectCategoryMap.create({ project_id, project_category_id }, {
        transaction: t,
      });
    }
  });

  return;
}

module.exports = createNewProject;
