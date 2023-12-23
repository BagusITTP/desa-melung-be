'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tour_image extends Model {
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
  tour_image.init({
    name: DataTypes.STRING,
    fileId: DataTypes.STRING,
    url: DataTypes.STRING,
    tour_package_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tour_image',
  });
  return tour_image;
};