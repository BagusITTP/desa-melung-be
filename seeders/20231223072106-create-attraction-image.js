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
        url: 'https://ik.imagekit.io/brahmastabagus/IMG-1707553121238_3rUEljS6d.webp?updatedAt=1707553124789',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kolam Renang',
        attraction_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/IMG-1707553108008_HipRPeMGt.webp?updatedAt=1707553112166',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Grujugan "Bengkok"',
        attraction_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/419560835_393922466480907_1025023392739769006_n.webp?updatedAt=1709190424939',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Spot Foto',
        attraction_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/y.jpg?updatedAt=1709190440312',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Spot Foto',
        attraction_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/IMG-1707553116730_SH8JY3ZDt.webp?updatedAt=1707553121044',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Spot Foto',
        attraction_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/IMG-1707553112424_y601Re3E2.webp?updatedAt=1707553116532',
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
