const router = require('express').Router();
const { updateExistingProject } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.put('/:id', async (req, res, next) => {
  try {
    await updateExistingProject(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("projects", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
