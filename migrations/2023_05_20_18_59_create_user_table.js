const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("users", {
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
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter user\'s photo filepath',
          },
        },
      },
      photo_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter user\'s photo url',
          },
        },
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
          fields: ["id", "username"],
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("users");
  },
};
