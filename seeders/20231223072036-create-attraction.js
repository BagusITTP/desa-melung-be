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
    await queryInterface.bulkInsert('attractions', [
      {
        ticket_price: 7000,
        description: 'Wisata Pagubugan Desa Melung adalah wahana wisata yang menyenangkan untuk keluarga, dengan nuansa pedesaan yang kental, udara yang sejuk, dan komitmen untuk melestarikan alam serta budaya masyarakat desa.',
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
    await queryInterface.bulkDelete('attractions', null, {})
  }
};
