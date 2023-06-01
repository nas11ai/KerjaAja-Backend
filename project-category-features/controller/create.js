const router = require('express').Router();
const generateMulter = require('../../utilities/generate_multer');

const { createNewProjectCategory } = require('../service');
const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

const upload = generateMulter("project_category_photo");

router.post('/', upload.single("image"), async (req, res, next) => {
  try {
    await createNewProjectCategory(req);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("project_categories", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
