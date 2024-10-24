'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
    INSERT INTO users("id", "fullName", email, password, "createdAt", "updatedAt")
    values (${4}, 'Admin', 'admin@gmail.com','$2a$12$.SMOyIe5ELdA6K/CBQazB.t2CE1grZ72NL38.O3xkz2Dhx4ERxIjq', '${new Date().toISOString()}', '${new Date().toISOString()}')
    `);
  },
  async down() {},
};
