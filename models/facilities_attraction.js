'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facilities_attraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.attraction, {
        foreignKey: 'attraction_id',
        as: 'attraction'
      })
    }
  }
  facilities_attraction.init({
    name: DataTypes.STRING,
    attraction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'facilities_attraction',
  });
  return facilities_attraction;
};