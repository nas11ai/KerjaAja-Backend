const fs = require("fs/promises");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../model");

const deleteExistingProjectCategory = async (req) => {
  let projectCategory = await ProjectCategory.findOne({ where: { name: req.params.category_name } });

  if (!projectCategory) {
    const err = new ErrorDetails("ProjectCategoryError", "category_name", "category_name not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
  }

  const photo_path = projectCategory.photo_path;

  if (photo_path) {
    try {
      await fs.unlink(photo_path);
    } catch (error) {
      throw error;
    }
  }

  await projectCategory.destroy();

  return;
}

module.exports = deleteExistingProjectCategory;
