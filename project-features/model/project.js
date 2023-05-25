const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utilities/db');

class Project extends Model { }

Project.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: {
      args: true,
      msg: 'Project ID has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project ID can\'t be empty',
      },
    },
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project title can\'t be empty',
      },
    },
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project Owner ID can\'t be empty',
      },
    },
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.ENUM("Open", "In Progress", "Closed"),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project status can\'t be empty',
      },
    },
  },
  fee: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project fee can\'t be empty',
      },
    },
    get() {
      return `Rp${this.getDataValue("fee")}`;
    }
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Project deadline can\'t be empty',
      },
    },
  },
  latitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter the Project Region latitude',
      },
    },
  },
  longitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter the Project Region longitude',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'Project',
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
    {
      unique: 'unique_title_owner',
      fields: ['title', 'owner_id'],
    },
  ],
});

module.exports = Project;
