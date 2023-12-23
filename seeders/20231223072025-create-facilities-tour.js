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
    await queryInterface.bulkInsert('facilities_tours', [
      {
        name: 'Makan Snack',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tiket Masuk',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aula',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sound System',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kolam Renang',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asuransi',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tenda',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Api Unggun',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'P3K',
        tour_package_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Makan Snack',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tiket Masuk',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aula',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sound System',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kolam Renang',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asuransi',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tenda',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Api Unggun',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'P3K',
        tour_package_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Narasumber',
        tour_package_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Narasumber',
        tour_package_id: 4,
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
    await queryInterface.bulkDelete('facilities_tours', null, {})
  }
};
