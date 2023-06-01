const router = require('express').Router();
const { getExistingProject } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.get('/', async (req, res, next) => {
  try {
    const projects = await getExistingProject(req);

    const response = new SuccessResponse(200, "OK", new DataDetails("projects", projects ?? null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
