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
    await queryInterface.bulkInsert('tour_packages', [
      {
        title: 'Paket Camping',
        sub_title: 'Camping di Pagubugan Melung',
        description: 'Pesona camping di tengah sawah membuat paket camping ini berbeda dengan camping yang lain. Dengan keindahan area pagubugan bisa merasakan sensasi segarnya mandi di kolam renang disana.',
        price: 83000,
        facilities: ["Makan snack", "Tiket masuk", "Aula", "Kolam renang", "Sound Sytem", "Asuransi", "Tenda", "Api Unggun", "P3k"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Paket Pelatihan',
        sub_title: 'Paket Study Banding/Belajar',
        description: 'Paket ini ditujukan kepada para pelajar, mahasiswa, dan akademis yang membutuhkan data terkait desa, kemudian dibawa keliling desa bersama dengan narasumber yang direkomendasikan serta guide lokal. Di harapkan peserta mendapatkan pengetahuan dan bisa meneraplan ilmu di rumah.',
        price: 120000,
        facilities: ["Narasumber"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Paket Live In',
        sub_title: 'Paket Menginap Dirumah Warga Lokal',
        description: 'Sensasi tinggal bersama warga lokal dan mengikuti berbagai kegiatan yang dilakukan pemilik homestay serta berinteraksi dengan warga lainnya + belajar pengolahan produk lokal.',
        price: 25000,
        facilities: ["Makan snack", "Tiket masuk", "Aula", "Kolam renang", "Sound Sytem", "Asuransi", "Tenda", "Api Unggun", "P3k"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Paket Edukasi',
        sub_title: 'Paket Belajar Budidaya',
        description: 'Pembelajaran tanaman padi/budidaya sayuran organik bersama warga, serta menangkap ikan, diajak berkeliling lingkungan desa untuk mengenali berbagai jenis pohon dan tanaman. Kegiatan ini ditunjukan bagi anak-anak usia sekolah TK, SD, SMP.',
        price: 120000,
        facilities: ["Narasumber"],
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
    await queryInterface.bulkDelete('tour_packages', null, {})
  }
};
