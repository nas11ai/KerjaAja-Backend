const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utilities/db');

class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: {
      args: true,
      msg: 'User ID has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'User ID can\'t be empty',
      },
    },
  },
  username: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'Username has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your username',
      },
    },
  },
  fullname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your fullname',
      },
    },
  },
  role: {
    type: DataTypes.ENUM("superadmin", "admin", "user"),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your role',
      },
    },
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your password',
      },
    },
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your gender',
      },
    },
  },
  photo_path: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photo_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user',
  indexes: [
    {
      unique: true,
      fields: ["id", "username"],
    },
  ],
});

module.exports = { User };
