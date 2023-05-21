const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utilities/db');

const { User } = require('../../user-features/model');

class UserRecommendation extends Model { }

UserRecommendation.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: {
      args: true,
      msg: 'User Recommendation ID has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'User Recommendation ID can\'t be empty',
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
    {
      unique: 'unique_sender_receiver',
      fields: ['sender_id', 'receiver_id'],
    },
  ],
});

User.hasMany(UserRecommendation, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

UserRecommendation.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

UserRecommendation.belongsTo(User, {
  foreignKey: 'receiver_id',
  as: 'receiver',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

module.exports = { UserRecommendation };
