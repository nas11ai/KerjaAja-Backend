const fs = require("fs/promises");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../model");

const createNewProjectCategory = async (req) => {
  try {
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

    if (!req.file) {
      const err = new ErrorDetails("ProjectCategoryError", "photo", "photo must not be blank");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    const photo_path = req.file.path;
    const photo_url = `static/project_category_photo/${name}/${req.file.filename}`;

    await ProjectCategory.create({ name, photo_path, photo_url });

    return;
  } catch (error) {
    if (req.file.path) {
      await fs.unlink(req.file.path);
    }

    throw error;
  }
}

module.exports = createNewProjectCategory;
