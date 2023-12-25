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
    await queryInterface.bulkInsert('locations', [
      {
        name: 'Grujugan "Bengkok"',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kolam Renang Tengah Sawah',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Selfie Deck di Atas Sawah',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Petilasan Leluhur Desa',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tempat Sesajen Petani',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('locations', null, {})
  }
};
