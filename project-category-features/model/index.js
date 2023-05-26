const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utilities/db');

class ProjectCategory extends Model { }

ProjectCategory.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: {
      args: true,
      msg: 'Project Category ID has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project Category ID can\'t be empty',
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'Project Category name has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter the Project Category name',
      },
    },
  },
  photo_path: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter the Project Category photo_path',
      },
    },
  },
  photo_url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter the Project Category photo_url',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ProjectCategory',
  indexes: [
    {
      unique: true,
      fields: ["id", "name"],
    },
  ],
});

module.exports = { ProjectCategory };
