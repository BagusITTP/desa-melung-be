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
    await queryInterface.bulkInsert('tour_images', [
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/Snapinsta.app_391473473_973951773671375_1857673111724472494_n_1080.jpg?updatedAt=1709190429369',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/Snapinsta.app_412038200_1400794440516505_4939609290160257078_n_1080.jpg?updatedAt=1709190426400',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/Snapinsta.app_418841802_3242720246024822_4325299253604537155_n_1080.jpg?updatedAt=1709190432887',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/images-9.webp?updatedAt=1709190426446',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/Snapinsta.app_106379547_194608548641185_1654838339183905996_n_1080.jpg?updatedAt=1709190431205',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://ik.imagekit.io/brahmastabagus/images-10.webp?updatedAt=1709190427658',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://ik.imagekit.io/brahmastabagus/319066011_605883804639478_3672082702898097995_n.webp?updatedAt=1709190454012',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://ik.imagekit.io/brahmastabagus/316860268_688997446032649_2818129144511005159_n.webp?updatedAt=1709190454379',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://ik.imagekit.io/brahmastabagus/IMG-1707021428466_FP8mHTZaQ.jpg?updatedAt=1707021432578',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://ik.imagekit.io/brahmastabagus/IMG-1707021428472_u6ktUkA6v.jpg?updatedAt=1707021432072',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://ik.imagekit.io/brahmastabagus/images-3.webp?updatedAt=1709191087660',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://ik.imagekit.io/brahmastabagus/IMG-1707822523302_Q7614GD0Y.jpg?updatedAt=1707822531798',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://ik.imagekit.io/brahmastabagus/331944534_1289561271649407_5277315715343985229_n.webp?updatedAt=1709190445240',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://ik.imagekit.io/brahmastabagus/247199926_407561614302248_6448667030169439346_n.webp?updatedAt=1709190449421',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://ik.imagekit.io/brahmastabagus/168737049_189448902838964_5730580987343987884_n.jpg?updatedAt=1709190446564',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://ik.imagekit.io/brahmastabagus/331308830_141531682126521_502763445000071779_n.webp?updatedAt=1709190454263',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://ik.imagekit.io/brahmastabagus/images-1.webp?updatedAt=1709190450253',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://ik.imagekit.io/brahmastabagus/paket-livein.webp?updatedAt=1709190455036',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://ik.imagekit.io/brahmastabagus/278012467_344567154314683_587390668514201807_n.webp?updatedAt=1709190443474',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://ik.imagekit.io/brahmastabagus/277904442_757876845143845_6039485068547521538_n.webp?updatedAt=1709190441243',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://ik.imagekit.io/brahmastabagus/277863063_318240666890340_7900116824788116865_n.webp?updatedAt=1709190441200',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://ik.imagekit.io/brahmastabagus/277906875_127564553075700_8431593264807578752_n.webp?updatedAt=1709190437991',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://ik.imagekit.io/brahmastabagus/277834098_641341903625103_6286238238461762264_n.webp?updatedAt=1709190421940',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://ik.imagekit.io/brahmastabagus/277855286_1078601069364810_9164375551165285246_n.webp?updatedAt=1709190421689',
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
    await queryInterface.bulkDelete('tour_images', null, {})
  }
};
