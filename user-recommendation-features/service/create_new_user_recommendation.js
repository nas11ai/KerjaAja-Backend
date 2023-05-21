const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { User } = require("../../user-features/model");

const { UserRecommendation } = require("../model");

const createNewUserRecommendation = async (req) => {
  let { sender_username, receiver_username, rating, description } = req.body;

  if (!sender_username) {
    const err = new ErrorDetails("UserRecommendationError", "sender_username", "sender_username must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const { id: sender_id } = await User.findOne({ where: { username: sender_username } });

  if (!sender_id) {
    const err = new ErrorDetails("UserRecommendationError", "sender_username", "sender_username not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  if (!receiver_username) {
    const err = new ErrorDetails("UserRecommendationError", "receiver_username", "receiver_username must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const { id: receiver_id } = await User.findOne({ where: { username: sender_username } });

  if (!receiver_id) {
    const err = new ErrorDetails("UserRecommendationError", "receiver_username", "receiver_username not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  if (!rating) {
    const err = new ErrorDetails("UserRecommendationError", "rating", "rating must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

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

  if (!description) {
    description = null;
  }

  try {
    await UserRecommendation.create({ sender_id, receiver_id, rating, description });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === "unique_sender_receiver") {
      const err = new ErrorDetails("UserRecommendationError", "rating", `rating between { sender_username: ${sender_username} } to { receiver_username: ${receiver_username} } already exist`);
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    throw error;
  }
}

module.exports = createNewUserRecommendation;
