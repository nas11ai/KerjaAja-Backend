const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utilities/db');

class ProjectRegion extends Model { }

ProjectRegion.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: {
      args: true,
      msg: 'Project Region ID has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project Region ID can\'t be empty',
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'Project Region name has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter the Project Region name',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ProjectRegion',
  indexes: [
    {
      unique: true,
      fields: ["id", "name"],
    },
  ],
});

module.exports = ProjectRegion;
