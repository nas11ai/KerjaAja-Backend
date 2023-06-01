const router = require('express').Router();
const { changeUserUsername } = require('../service');

const { SuccessResponse, DataDetails } = require("../../utilities/response_model");

router.put('/:username', async (req, res, next) => {
  try {
    await changeUserUsername(req);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("change_user_username", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
