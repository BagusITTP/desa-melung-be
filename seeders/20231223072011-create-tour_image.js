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
        url: 'https://kolomdesa.com/wp-content/uploads/2023/03/Camp-Desa-Pagubugan-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://kolomdesa.com/wp-content/uploads/2023/03/Camp-Desa-Pagubugan-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://www.nativeindonesia.com/foto/2022/06/camping-ground-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camping Pagubugan',
        tour_package_id: 1,
        url: 'https://cdn.idntimes.com/content-images/community/2023/08/snapinstaapp-361978219-243400385208202-2444362044584415928-n-1080-8f473a22ea0f6137bacce869755a2d6e-48a1a761ffb2351ebb533f16aa1331be.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://i0.wp.com/www.melung.desa.id/wp-content/uploads/melung-kesenian-lesung2.jpg?resize=1080%2C607&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://jadesta.kemenparekraf.go.id/imgpost/32403.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://jadesta.kemenparekraf.go.id/imgpost/74584_medium.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Study Banding',
        tour_package_id: 2,
        url: 'https://jadesta.kemenparekraf.go.id/imgpost/70324_medium.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://asset-2.tstatic.net/jateng/foto/bank/images/tim-dosen-universitas-amikom-purwokerto-dengan-ketua-pelaksana-anugerah.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://jadesta.kemenparekraf.go.id/imgpost/32395_medium.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv--zPvn3eMkmIbrmz9Oth49O0-dgIltm0C-esxl95usKBwsWrx_Kvt6VgadHusKubcxw&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Live In',
        tour_package_id: 3,
        url: 'https://jadesta.kemenparekraf.go.id/imgpost/33578_medium.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://i0.wp.com/www.melung.desa.id/wp-content/uploads/Musim-panen-desa-Melung.jpg?resize=1080%2C675&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQgqoxJkX-eKFGROJkfbNKhhQEZKaOougw3tPoz1HByfE4VfaTHAmfyUGzYPXCSQUTBY&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://i0.wp.com/www.melung.desa.id/wp-content/uploads/Gunung-Angaran.jpg?resize=1080%2C675&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budidaya',
        tour_package_id: 4,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJL5TH0CTEzVynKIVF0cICmiUSzqzgSNaGjfkEaqr7q1ioMW1W7QTtICZGeC8dRyeQ7g&usqp=CAU',
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
