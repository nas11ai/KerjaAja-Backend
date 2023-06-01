const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("user_recommendations", {
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ["id"],
        },
        unique_sender_receiver: {
          customIndex: true,
          fields: ["sender_id", "receiver_id"],
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("user_recommendations");
  },
};
