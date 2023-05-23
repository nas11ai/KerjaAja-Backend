const { Op } = require('sequelize');

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");

const { ProjectCategory } = require("../model");

const getExistingProjectCategory = async (req) => {
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

  // query name
  if (req.query.name) {
    if (req.query.name === 'ASC') {
      order.push(['name', 'ASC']);
    }

    if (req.query.name === 'DESC') {
      order.push(['name', 'DESC']);
    }
    where.name = { [Op.like]: `${req.query.name}` };
  }

  // query created_at
  if (req.query.created_at === 'ASC') {
    order.push(['created_at', 'ASC']);
  }

  if (req.query.created_at === 'DESC') {
    order.push(['created_at', 'DESC']);
  }

  // query updated_at
  if (req.query.updated_at === 'ASC') {
    order.push(['updated_at', 'ASC']);
  }

  if (req.query.updated_at === 'DESC') {
    order.push(['updated_at', 'DESC']);
  }

  const { count, rows } = await ProjectCategory.findAndCountAll({
    attributes: [
      'name',
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

module.exports = getExistingProjectCategory;
