"use strict";

const { randomUUID } = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        id: randomUUID(),
        name: "SUPER_ADMIN",
        description: "System Super Administrator",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: randomUUID(),
        name: "ADMIN",
        description: "Store Administrator",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: randomUUID(),
        name: "CUSTOMER",
        description: "Customer",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "roles",
      {
        name: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
      },
      {},
    );
  },
};
