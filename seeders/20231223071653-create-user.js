'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        email: 'admin@gmail.com',
        phone_number: '08123456789',
        password: '$2b$10$oMyc0SF7qa53/hXTChBqAuVFgYbERHoCBr7s1AeBjueaAc4yl1Rdi',
        role: 'admin',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user',
        email: 'user@gmail.com',
        phone_number: '08123456789',
        password: '$2b$10$H3yeAl2WxA8lGFsjjCg/uOcO2iaxckko5AXib9XnoCHCGP5Ownfo2',
        role: 'user',
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
