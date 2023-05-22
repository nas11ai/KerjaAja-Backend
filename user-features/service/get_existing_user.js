const { Op } = require('sequelize');

const { User } = require("../model");

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");

const getExistingUser = async (req) => {
  // pagination
  if (req.query.page && isNaN(Number(req.query.page))) {
    const err = new ErrorDetails("OfficeError", "pagination", "page must be integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (req.query.size && isNaN(Number(req.query.size))) {
    const err = new ErrorDetails("OfficeError", "pagination", "size must be integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const where = {};

  const order = [];

  // query username
  if (req.query.username) {
    where.username = { [Op.like]: `${req.query.username}` };
  }

  // query fullname
  if (req.query.fullname) {
    where.fullname = { [Op.like]: `%${req.query.fullname}%` };
  }

  // query role
  if (req.query.role) {
    if (!(req.query.role === "superadmin" || req.query.role === "admin" || req.query.role === "user")) {
      const err = new ErrorDetails("UserRecommendationError", "role", "role not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
    }
    where.role = { [Op.like]: `${req.query.role}` };
  }

  // query gender
  if (req.query.gender) {
    if (!(req.query.gender === "male" || req.query.gender === "female")) {
      const err = new ErrorDetails("UserRecommendationError", "gender", "gender not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
    }
    where.gender = { [Op.like]: `${req.query.gender}` };
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

  const { count, rows } = await User.findAndCountAll({
    attributes: [
      'username',
      'fullname',
      'gender',
      'photo_url',
      'created_at',
      'updated_at',
    ],
    where,
    order,
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

module.exports = getExistingUser;
