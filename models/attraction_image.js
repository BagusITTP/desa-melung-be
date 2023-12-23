'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attraction_image extends Model {
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
  attraction_image.init({
    name: DataTypes.STRING,
    fileId: DataTypes.STRING,
    url: DataTypes.STRING,
    attraction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'attraction_image',
  });
  return attraction_image;
};