const router = require('express').Router();
const { deleteExistingUserRecommendation } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.delete('/:sender_username', async (req, res, next) => {
  try {
    await deleteExistingUserRecommendation(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("user_recommendations", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
