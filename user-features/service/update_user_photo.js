const fs = require("fs/promises");
const path = require("path");

const { sequelize } = require("../../utilities/db");
const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { User } = require("../model");

const updateUserPhoto = async (req) => {
  try {
    await sequelize.transaction(async (t) => {
      const username = req.params.username;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        const err = new ErrorDetails("UserPhotoError", "user", "user not found");
        console.error(err); // TODO: ganti console ke log kalau sudah mau production
        throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
      }

      if (req.query.delete && req.query.delete === "true") {
        if (!(user.photo_path || user.photo_url)) {
          const err = new ErrorDetails("UserPhotoError", "photo", "no photo to be deleted");
          console.error(err); // TODO: ganti console ke log kalau sudah mau production
          throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
        }

        const { photo_path } = user;

        const folderPath = path.dirname(photo_path);
        const files = await fs.readdir(folderPath);

        await fs.unlink(photo_path);

        if (files.length < 1) {
          await fs.rm(folderPath, { recursive: true });
        }

        user.photo_path = null;
        user.photo_url = null;

        await user.save({ transaction: t });
      }

      if (req.file) {
        if (user.photo_path || user.photo_url) {
          const err = new ErrorDetails("UserPhotoError", "photo", "photo already exists");
          console.error(err); // TODO: ganti console ke log kalau sudah mau production
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        user.photo_path = req.file.path;
        user.photo_url = `static/user_profile_photo/${username}/${req.file.filename}`;

        await user.save({ transaction: t });
      }
    });
  } catch (error) {
    if (req.files && req.files.length > 0) {
      for (const image of req.files) {
        await fs.unlink(image.path);
      }
    }

    throw error;
  }
};

module.exports = updateUserPhoto;
