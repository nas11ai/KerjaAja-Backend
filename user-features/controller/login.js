const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../utilities/response_model');
const { login } = require("../service");
router.post('/', async (req, res, next) => {
  try {
    const { newAccessToken, newRefreshToken, userRole } = await login(req);

    // res.cookie('jwt', newRefreshToken, {
    //   httpOnly: true,
    //   sameSite: 'None',
    //   // sameSite: 'strict',
    //   secure: true,
    //   // secure: false,
    //   //TODO: Ganti ke 1 hari kalau deployment
    //   maxAge: 24 * 60 * 60 * 1000,
    //   // maxAge: 15 * 60 * 1000,
    // });

    const response = new SuccessResponse(200, "OK", new DataDetails("bearer_token", {
      "user_role": userRole,
      "access_token": newAccessToken,
    }));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
