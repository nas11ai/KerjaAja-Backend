const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utilities/db');

class UserRecommendation extends Model { }

UserRecommendation.init({
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
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Sender ID can\'t be empty',
      },
    },
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  receiver_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Receiver ID can\'t be empty',
      },
    },
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  rating: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Rating can\'t be empty',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'UserRecommendation',
  indexes: [
    {
      unique: true,
      fields: ["id"],
    },
  ],
});

module.exports = UserRecommendation;
