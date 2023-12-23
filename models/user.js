'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ticket_booking, {
        foreignKey: 'user_id',
        as: 'ticket_bookings',
        onDelete: "CASCADE"
      })

      this.hasMany(models.tour_booking, {
        foreignKey: 'user_id',
        as: 'tour_bookings',
        onDelete: "CASCADE"
      })
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(['admin', 'user']),
    otp: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    expiration_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};