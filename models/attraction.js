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
      this.hasMany(models.attraction_image, {
        foreignKey: 'attraction_id',
        as: 'attraction_images'
      })
    }
  }
  attraction.init({
    ticket_price: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    facilities: DataTypes.ARRAY(DataTypes.STRING),
    locations: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'attraction',
  });
  return attraction;
};