const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("projects", {
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
      region_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Project Region ID can\'t be empty',
          },
        },
        references: { model: 'project_regions', key: 'id' },
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
        unique_title_owner: {
          customIndex: true,
          fields: ['title', 'owner_id'],
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("projects");
  },
};
