const router = require('express').Router();
const { deleteExistingProjectCategory } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.delete('/:category_name', async (req, res, next) => {
  try {
    await deleteExistingProjectCategory(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("project_categories", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
