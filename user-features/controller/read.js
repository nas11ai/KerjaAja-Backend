const router = require('express').Router();
const { getExistingUser } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.get('/', async (req, res, next) => {
  try {
    const users = await getExistingUser(req);

    const response = new SuccessResponse(200, "OK", new DataDetails("users", users ?? null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
