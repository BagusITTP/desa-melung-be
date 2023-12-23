'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tour_package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.tour_booking, {
        foreignKey: 'tour_package_id',
        as: 'tour_booking'
      })

      this.hasMany(models.tour_image, {
        foreignKey: 'tour_package_id',
        as: 'tour_images'
      })

      this.hasMany(models.facilities_tour, {
        foreignKey: 'tour_package_id',
        as: 'facilities_tours'
      })
    }
  }
  tour_package.init({
    title: DataTypes.STRING,
    sub_title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'tour_package',
  });
  return tour_package;
};