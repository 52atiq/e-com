"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      phone: {
        type: Sequelize.STRING,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      avatar: {
        type: Sequelize.STRING,
      },

      gender: {
        type: Sequelize.ENUM("MALE", "FEMALE", "OTHER"),
      },

      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE", "BLOCKED"),
        defaultValue: "ACTIVE",
      },

      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      last_login: {
        type: Sequelize.DATE,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_gender";',
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_status";',
    );
  },
};
