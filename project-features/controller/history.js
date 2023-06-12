const router = require('express').Router();
const { getExistingProjectByUsername } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.get('/:username', async (req, res, next) => {
  try {
    const projects = await getExistingProjectByUsername(req);

    const response = new SuccessResponse(200, "OK", new DataDetails("projects", projects ?? null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
