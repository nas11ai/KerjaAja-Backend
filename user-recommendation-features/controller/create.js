const router = require('express').Router();
const { createNewUserRecommendation } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.post('/', async (req, res, next) => {
  try {
    await createNewUserRecommendation(req);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("user_recommendations", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
