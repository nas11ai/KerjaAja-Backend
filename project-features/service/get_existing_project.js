const { Op } = require('sequelize');

const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../../project-category-features/model");
const { User } = require("../../user-features/model");

const { Project, ProjectCategoryMap } = require("../model");

const getExistingProject = async (req) => {
  const { id } = req.query;

  if (id) {
    const project = await Project.findByPk(id, {
      attributes: [
        "id",
        "title",
        "status",
        "fee",
        "deadline",
        "latitude",
        "longitude",
        "created_at",
        "updated_at",
      ],
    });

    if (!project) {
      const err = new ErrorDetails("ProjectError", "project", "project not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
    }

    return project;
  }

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

  const projectWhere = {};

  const projectOrder = [];

  // query project status
  if (req.query.status) {
    if (!(req.query.status === "Open" || req.query.status === "In Progress" || req.query.status === "Closed")) {
      const err = new ErrorDetails("ProjectError", "status", "status value must be between 'Open' or 'In Progress' or 'Closed'");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
    }

    projectWhere.status = { [Op.like]: `${req.query.status}` };
  }

  // query project fee
  if (req.query.fee === 'ASC') {
    projectOrder.push(['fee', 'ASC']);
    return;
  }

  if (req.query.fee === 'DESC') {
    projectOrder.push(['fee', 'DESC']);
    return;
  }

  if (req.query.fee_from && Number(req.query.fee_from)) {
    projectWhere.fee = { [Op.between]: [Number(req.query.fee_from), req.query.fee_to ? Number(req.query.fee_to) ? Number(req.query.fee_to) : Number(req.query.fee_from) : Number(req.query.fee_from)] };
  }

  const categoryWhere = {};

  const categoryOrder = [];

  // query category name
  if (req.query.category_names) {
    let categoryNames = req.query.category_names;
    if (!Array.isArray(categoryNames)) {
      categoryNames = [categoryNames]; // Convert to an array
    }

    categoryWhere.name = { [Op.in]: categoryNames };

    const projectIdsWithCategory = await ProjectCategoryMap.findAll({
      include: [
        {
          model: ProjectCategory,
          foreignKey: "project_category_id",
          as: "project_category",
          attributes: ["name"],
          where: categoryWhere,
        },
      ],
    });

    console.log(projectIdsWithCategory);

    if (!projectIdsWithCategory || projectIdsWithCategory.length === 0) {
      const err = new ErrorDetails("ProjectError", "category_names", "category_names not found");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
    }

    const projectIds = projectIdsWithCategory.map((map) => map.project_id);

    projectWhere.id = { [Op.in]: projectIds };
  }

  const { count, rows } = await Project.findAndCountAll({
    attributes: [
      "id",
      "title",
      "status",
      "fee",
      "deadline",
      "latitude",
      "longitude",
      'created_at',
      'updated_at',
    ],
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["username"],
      },
      {
        model: ProjectCategoryMap,
        as: "categories",
        attributes: [
          'created_at',
          'updated_at',
        ],
        include: [
          {
            model: ProjectCategory,
            foreignKey: "project_category_id",
            as: "project_category",
            attributes: ["name"],
            order: categoryOrder,
          },
        ],
      },
    ],
    where: projectWhere,
    order: projectOrder,
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

module.exports = getExistingProject;
