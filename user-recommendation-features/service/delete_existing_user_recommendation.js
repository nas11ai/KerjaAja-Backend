const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { User } = require("../../user-features/model");

const { UserRecommendation } = require("../model");

const deleteExistingUserRecommendation = async (req) => {
  let user = await User.findOne({ where: { username: req.params.sender_username } });

  if (!user) {
    const err = new ErrorDetails("UserRecommendationError", "sender_username", "sender_username not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
  }

  const { id: sender_id } = user;

  const where = { sender_id };

  if (req.query.receiver_username) {
    user = await User.findOne({ where: { username: req.query.receiver_username } });

    if (!user) {
      const err = new ErrorDetails("UserRecommendationError", "receiver_username", "receiver_username not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
    }

    const { id: receiver_id } = user;

    where.receiver_id = receiver_id;
  }

  const deletedData = await UserRecommendation.destroy({ where });

  if (!deletedData) {
    const err = new ErrorDetails("UserRecommendationError", "user_recommendation", "user_recommendation not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
  }

  return;
}

module.exports = deleteExistingUserRecommendation;
