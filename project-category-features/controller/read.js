const router = require('express').Router();
const { getExistingProjectCategory } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.get('/', async (req, res, next) => {
  try {
    const projectCategories = await getExistingProjectCategory(req);

    const response = new SuccessResponse(200, "OK", new DataDetails("project_categories", projectCategories ?? null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
