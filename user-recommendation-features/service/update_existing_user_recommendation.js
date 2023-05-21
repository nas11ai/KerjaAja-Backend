const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { User } = require("../../user-features/model");

const { UserRecommendation } = require("../model");

const updateExistingUserRecommendation = async (req) => {
  let { rating, description } = req.body;

  if (!req.query.receiver_username) {
    const err = new ErrorDetails("UserRecommendationError", "receiver_username", "receiver_username must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  let user = await User.findOne({ where: { username: req.query.receiver_username } });

  if (!user) {
    const err = new ErrorDetails("UserRecommendationError", "receiver_username", "receiver_username not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  const { id: receiver_id } = user;

  user = await User.findOne({ where: { username: req.params.sender_username } });

  if (!user) {
    const err = new ErrorDetails("UserRecommendationError", "sender_username", "sender_username not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  const { id: sender_id } = user;

  const userRecommendation = await UserRecommendation.findOne({
    where: { sender_id, receiver_id },
  });

  if (!userRecommendation) {
    const err = new ErrorDetails("UserRecommendationError", "user_recommendation", "user_recommendation not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  if (!(rating || description)) {
    const err = new ErrorDetails("UserRecommendationError", "user_recommendation", "rating or description must be available");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (rating) {
    rating = Number(rating);

    if (isNaN(rating)) {
      const err = new ErrorDetails("UserRecommendationError", "rating", "rating must be number");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    if (rating < 1 || rating > 5) {
      const err = new ErrorDetails("UserRecommendationError", "rating", "rating must be between 1 to 5");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    userRecommendation.rating = rating;
  }

  if (description) {
    userRecommendation.description = description;
  }

  userRecommendation.save();
}

module.exports = updateExistingUserRecommendation;
