const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../model");

const deleteExistingProjectCategory = async (req) => {
  let projectCategory = await ProjectCategory.findOne({ where: { name: req.params.category_name } });

  if (!projectCategory) {
    const err = new ErrorDetails("ProjectCategoryError", "category_name", "category_name not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  await projectCategory.destroy();

  return;
}

module.exports = deleteExistingProjectCategory;
