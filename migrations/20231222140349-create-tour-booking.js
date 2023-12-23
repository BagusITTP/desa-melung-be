'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tour_bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      arrival_date: {
        type: Sequelize.DATE
      },
      departure_date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.INTEGER
      },
      meal_count: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.DOUBLE
      },
      midtrans_token: {
        type: Sequelize.STRING
      },
      midtrans_booking_code: {
        type: Sequelize.STRING
      },
      tour_package_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tour_bookings');
  }
};