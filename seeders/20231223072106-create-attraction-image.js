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
    await queryInterface.bulkInsert('attraction_images', [
      {
        name: 'Pagubugan',
        attraction_id: 1,
        url: 'https://dolanbanyumas.banyumaskab.go.id/assets/gambar_objek/desa_wisata/galeri/1632966174.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kolam Renang',
        attraction_id: 1,
        url: 'https://i0.wp.com/www.melung.desa.id/wp-content/uploads/265175bf-5cbb-4b31-8206-d51ec13f044a.jpg?resize=1080%2C810&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Grujugan "Bengkok"',
        attraction_id: 1,
        url: 'https://jadesta.kemenparekraf.go.id/imgpost/18370.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kolam Renang',
        attraction_id: 1,
        url: 'https://asapena.com/wp-content/uploads/2021/04/pagubugan-melung.jpg.webp',
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
    await queryInterface.bulkDelete('attraction_images', null, {})
  }
};
