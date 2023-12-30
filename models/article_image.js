'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.article, {
        foreignKey: 'article_id',
        as: 'article'
      })
    }
  }
  article_image.init({
    name: DataTypes.STRING,
    fileId: DataTypes.STRING,
    url: DataTypes.STRING,
    article_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'article_image',
  });
  return article_image;
};