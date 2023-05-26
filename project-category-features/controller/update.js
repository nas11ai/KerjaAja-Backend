const router = require('express').Router();
const generateMulter = require('../../utilities/generate_multer');

const { updateExistingProjectCategory } = require('../service');
const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

const upload = generateMulter("project_category_photo");

router.put('/:category_name', upload.single("image"), async (req, res, next) => {
  try {
    await updateExistingProjectCategory(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("project_categories", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
