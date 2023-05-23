const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("project_regions", {
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
    await queryInterface.dropTable("project_regions");
  },
};
