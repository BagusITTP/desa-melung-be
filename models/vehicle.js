'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.ticket_booking, {
        foreignKey: 'vehicle_id',
        as: 'ticket_booking'
      })
    }
  }
  vehicle.init({
    type: DataTypes.ENUM('Motor', 'Mobil'),
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'vehicle',
  });
  return vehicle;
};