const { User } = require("../../user-features/model");
const { ProjectCategory } = require("../../project-category-features/model");

const Project = require("./project");
const ProjectCategoryMap = require("./project_category_map");

User.hasMany(Project, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

ProjectCategory.hasMany(ProjectCategoryMap, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

ProjectCategoryMap.belongsTo(ProjectCategory, {
  foreignKey: "project_category_id",
  as: "project_category",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Project.hasMany(ProjectCategoryMap, {
  as: "categories",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

ProjectCategoryMap.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

module.exports = { Project, ProjectCategoryMap };
