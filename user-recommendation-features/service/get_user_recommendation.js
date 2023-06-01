const { Op } = require('sequelize');

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { User } = require("../../user-features/model");

const { UserRecommendation } = require("../model");

const getExistingUserRecommendation = async (req) => {
  // pagination
  if (req.query.page && isNaN(Number(req.query.page))) {
    const err = new ErrorDetails("OfficeError", "pagination", "page must be integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  if (req.query.size && isNaN(Number(req.query.size))) {
    const err = new ErrorDetails("OfficeError", "pagination", "size must be integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  const where = {};

  const order = [];

  // query rating
  if (req.query.rating === 'ASC') {
    order.push(['rating', 'ASC']);
  }

  if (req.query.rating === 'DESC') {
    order.push(['rating', 'DESC']);
  }

  if (req.query.rating_from && Number(req.query.rating_from)) {
    where.rating = { [Op.between]: [Number(req.query.rating_from), req.query.rating_to ? Number(req.query.rating_to) ? Number(req.query.rating_to) : Number(req.query.rating_from) : Number(req.query.semi_gross_area_from)] };
  }

  // query receiver_id
  if (req.query.receiver_username) {
    const user = await User.findOne({ where: { username: req.query.receiver_username } });

    if (!user) {
      const err = new ErrorDetails("UserRecommendationError", "receiver_username", "receiver_username not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
    }

    const { id: receiver_id } = user;
    if (receiver_id) where.receiver_id = { [Op.like]: `%${receiver_id}%` };
  }

  // query sender_id
  if (req.query.sender_username) {
    const user = await User.findOne({ where: { username: req.query.sender_username } });

    if (!user) {
      const err = new ErrorDetails("UserRecommendationError", "sender_username", "sender_username not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
    }

    const { id: sender_id } = user;
    if (sender_id) where.sender_id = { [Op.like]: `%${sender_id}%` };

  }

  // query office created_at
  if (req.query.created_at === 'ASC') {
    order.push(['created_at', 'ASC']);
  }

  if (req.query.created_at === 'DESC') {
    order.push(['created_at', 'DESC']);
  }

  // query office updated_at
  if (req.query.updated_at === 'ASC') {
    order.push(['updated_at', 'ASC']);
  }

  if (req.query.updated_at === 'DESC') {
    order.push(['updated_at', 'DESC']);
  }

  const { count, rows } = await UserRecommendation.findAndCountAll({
    attributes: [
      'rating',
      'description',
      'created_at',
      'updated_at',
    ],
    where,
    order,
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['username'],
      },
      {
        model: User,
        as: 'receiver',
        attributes: ['username'],
      },
    ],
    offset: Number(req.query.page) && Number(req.query.size) ? (Number(req.query.page) - 1) * Number(req.query.size) : 0,
    limit: Number(req.query.page) && Number(req.query.size) ? Number(req.query.size) === 5 ? 5 : Number(req.query.size) === 25 ? 25 : Number(req.query.size) === 50 ? 50 : 25 : 25,
  });

  return {
    current_page: Number(req.query.page) ? Number(req.query.page) : 1,
    data_count_on_current_page: rows.length,
    total_data_count: count,
    total_pages: Math.ceil(count / (Number(req.query.page) && Number(req.query.size) ? Number(req.query.size) === 5 ? 5 : Number(req.query.size) === 25 ? 25 : Number(req.query.size) === 50 ? 50 : 25 : 25)),
    records: rows,
  };
}

module.exports = getExistingUserRecommendation;
