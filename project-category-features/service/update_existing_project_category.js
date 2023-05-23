const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../model");

const updateExistingProjectCategory = async (req) => {
  const { new_name } = req.body;

  const updatedProjectCategory = await ProjectCategory.findOne({ where: { name: req.params.category_name } });

  if (!updatedProjectCategory) {
    const err = new ErrorDetails("ProjectCategoryError", "category_name", "project_categories name not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  if (!new_name) {
    const err = new ErrorDetails("ProjectCategoryError", "new_name", "project_categories new_name must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof new_name !== "string") {
    const err = new ErrorDetails("ProjectCategoryError", "new_name", [
      "project_categories new_name must be a string",
      "project_categories new_name must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const existingProjectCategory = await ProjectCategory.findOne({ where: { name: new_name } });

  if (existingProjectCategory) {
    const err = new ErrorDetails("ProjectCategoryError", "new_name", "project_categories new_name has been taken");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  updatedProjectCategory.name = new_name;

  await updatedProjectCategory.save();

  return;
}

module.exports = updateExistingProjectCategory;
