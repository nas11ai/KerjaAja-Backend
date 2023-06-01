const router = require('express').Router();
const generateMulter = require('../../utilities/generate_multer');

const { updateUserPhoto } = require('../service');
const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

const upload = generateMulter("user_profile_photo");

router.put('/:username', upload.single("image"), async (req, res, next) => {
  try {
    await updateUserPhoto(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("user_photos", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
