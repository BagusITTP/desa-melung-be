'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket_booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ticket_booking.init({
    amount: DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER,
    total_price: DataTypes.DOUBLE,
    midtrans_token: DataTypes.STRING,
    midtrans_booking_code: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ticket_booking',
  });
  return ticket_booking;
};