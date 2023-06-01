const fs = require("fs/promises");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../model");

const updateExistingProjectCategory = async (req) => {
  try {
    const { new_name } = req.body;

    if (!(new_name || req.file)) {
      const err = new ErrorDetails("ProjectCategoryError", "request_body", "request_body must not be blank");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    const updatedProjectCategory = await ProjectCategory.findOne({ where: { name: req.params.category_name } });

    if (!updatedProjectCategory) {
      const err = new ErrorDetails("ProjectCategoryError", "category_name", "project_categories name not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
    }

    if (new_name) {
      if (typeof new_name !== "string") {
        const err = new ErrorDetails("ProjectCategoryError", "new_name", [
          "project_categories new_name must be a string",
          "project_categories new_name must not be null",
        ]);
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
      }

      const existingProjectCategory = await ProjectCategory.findOne({ where: { name: new_name } });

      if (existingProjectCategory) {
        const err = new ErrorDetails("ProjectCategoryError", "new_name", "project_categories new_name has been taken");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
      }

      updatedProjectCategory.name = new_name;
    }

    if (req.file) {
      if (updatedProjectCategory.photo_path) {
        try {
          await fs.unlink(updatedProjectCategory.photo_path);
        } catch (error) {
          throw error;
        }
      }

      updatedProjectCategory.photo_path = req.file.path;
      updatedProjectCategory.photo_url = `static/project_category_photo/${new_name}/${req.file.filename}`;
    }

    await updatedProjectCategory.save();

    return;
  } catch (error) {
    if (req.file.path) {
      await fs.unlink(req.file.path);
    }

    throw error;
  }
}

module.exports = updateExistingProjectCategory;
