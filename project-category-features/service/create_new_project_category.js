const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../model");

const createNewProjectCategory = async (req) => {
  const { name } = req.body;

  if (!name) {
    const err = new ErrorDetails("ProjectCategoryError", "name", "project_categories name must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof name !== "string") {
    const err = new ErrorDetails("ProjectCategoryError", "name", [
      "project_categories name must be a string",
      "project_categories name must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const existingProjectCategory = await ProjectCategory.findOne({ where: { name } });

  if (existingProjectCategory) {
    const err = new ErrorDetails("ProjectCategoryError", "name", "project_categories name already exist");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  await ProjectCategory.create({ name });

  return;
}

module.exports = createNewProjectCategory;
