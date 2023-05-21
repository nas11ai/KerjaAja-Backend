const router = require('express').Router();
const { verifyUserPassword } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.get('/:username', async (req, res, next) => {
  try {
    await verifyUserPassword(req);

    const response = new SuccessResponse(200, "OK", new DataDetails("verify_user_password", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
