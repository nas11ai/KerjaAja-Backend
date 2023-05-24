const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utilities/db');

class ProjectCategoryMap extends Model { }

ProjectCategoryMap.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: {
      args: true,
      msg: 'Project Category Map ID has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project Category Map ID can\'t be empty',
      },
    },
  },
  project_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project ID can\'t be empty',
      },
    },
    references: { model: 'projects', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project Category ID can\'t be empty',
      },
    },
    references: { model: 'project_categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ProjectCategoryMap',
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
    {
      unique: 'unique_project_category',
      fields: ['project_id', 'category_id'],
    },
  ],
});

module.exports = ProjectCategoryMap;
