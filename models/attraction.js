'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.location, {
        foreignKey: 'attraction_id',
        as: 'locations'
      })

      this.hasMany(models.facilities_attraction, {
        foreignKey: 'attraction_id',
        as: 'facilities_attractions'
      })

      this.hasMany(models.attraction_image, {
        foreignKey: 'attraction_id',
        as: 'attraction_images'
      })
    }
  }
  attraction.init({
    ticket_price: DataTypes.DOUBLE,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'attraction',
  });
  return attraction;
};