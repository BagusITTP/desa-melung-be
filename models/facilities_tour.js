'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facilities_tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tour_package, {
        foreignKey: 'tour_package_id',
        as: 'tour_package'
      })
    }
  }
  facilities_tour.init({
    name: DataTypes.STRING,
    tour_package_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'facilities_tour',
  });
  return facilities_tour;
};