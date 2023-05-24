const router = require('express').Router();
const { deleteExistingProject } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteExistingProject(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("projects", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
