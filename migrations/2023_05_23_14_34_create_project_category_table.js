const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("project_categories", {
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
          fields: ["id", "name"],
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("project_categories");
  },
};
