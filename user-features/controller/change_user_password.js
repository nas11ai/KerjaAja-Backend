const router = require('express').Router();
const { changeUserPassword } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.put('/:username', async (req, res, next) => {
  try {
    await changeUserPassword(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("change_user_password", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
