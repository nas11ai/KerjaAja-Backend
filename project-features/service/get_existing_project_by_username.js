const { ErrorResponse, ErrorDetails } = require("../../utilities/response_model");
const { ProjectCategory } = require("../../project-category-features/model");
const { User } = require("../../user-features/model");

const { Project, ProjectCategoryMap } = require("../model");

const getExistingProjectByUsername = async (req) => {
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

  const { username } = req.params;

  if (!username) {
    const err = new ErrorDetails("ProjectError", "owner_username", "owner_username must not be empty");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { message: err.message });
  }

  const existingUser = await User.findOne({ where: { username } });

  if (!existingUser) {
    const err = new ErrorDetails("ProjectError", "owner_username", "owner_username not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { message: err.message });
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
        attributes: [
          "username",
          "photo_url",
        ],
        where: { username },
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
          },
        ],
      },
    ],
    order: [['created_at', 'DESC']],
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

module.exports = getExistingProjectByUsername;
