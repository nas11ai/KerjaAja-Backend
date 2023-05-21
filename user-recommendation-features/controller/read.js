const router = require('express').Router();
const { getExistingUserRecommendation } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.get('/', async (req, res, next) => {
  try {
    const userRecommendations = await getExistingUserRecommendation(req);

    const response = new SuccessResponse(200, "OK", new DataDetails("user_recommendations", userRecommendations ?? null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
