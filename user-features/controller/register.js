const router = require('express').Router();
const { register } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.post('/', async (req, res, next) => {
  try {
    await register(req);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("users", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
