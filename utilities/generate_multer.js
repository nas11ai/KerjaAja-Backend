const path = require('path');
const fs = require('fs');
const multer = require("multer");

const { ErrorResponse, ErrorDetails } = require("./response_model");

const generateMulter = (assetType) => {
  if (typeof assetType !== "string") {
    const err = new ErrorDetails("MulterError", "asset_type", "asset_type must be string");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const imagePath = path.join(path.resolve(''), 'assets', `${assetType}`, `${req.body.username ? req.body.username : req.params.username ? req.params.username : req.params.name ? req.params.name : req.body.name}`);

        if (!fs.existsSync(imagePath)) {
          fs.mkdirSync(imagePath, { recursive: true });
        }

        cb(null, imagePath);
      },
      filename: function (req, file, cb) {
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

        cb(null, `${req.body.username || req.params.username || req.params.name || req.body.name}_${formattedDate}_${file.originalname}`);
      }
    }),
    fileFilter: function (req, file, cb) {
      // allow only .jpg and .png files
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        const err = new ErrorDetails("MulterError", "file_type", "Only .jpg and .png files are allowed");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        cb(new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message }));
      }
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // set max file size to 10MB
    }
  });
}


module.exports = generateMulter;
