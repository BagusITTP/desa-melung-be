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
    await queryInterface.bulkInsert('facilities_attractions', [
      {
        name: 'Kolam Renang',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pendapa "Pagubugan"',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Warung-warung Kuliner',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gubug-gubug Tempat Istirahat',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tempat-tempat Swafoto',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Area Bermain Anak (Play Ground)',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kali kecil tempat “Ciblon” (bermain air)',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ruang Ganti',
        attraction_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Toilet',
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
    await queryInterface.bulkDelete('facilities_attractions', null, {})
  }
};
