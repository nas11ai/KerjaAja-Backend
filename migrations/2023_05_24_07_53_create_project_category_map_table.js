const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("project_category_maps", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: {
          args: true,
          msg: 'Project Category Map ID has been taken',
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Project Category Map ID can\'t be empty',
          },
        },
      },
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Project ID can\'t be empty',
          },
        },
        references: { model: 'projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Project Category ID can\'t be empty',
          },
        },
        references: { model: 'project_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        unique_project_category: {
          customIndex: true,
          fields: ['project_id', 'category_id'],
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("project_category_maps");
  },
};
