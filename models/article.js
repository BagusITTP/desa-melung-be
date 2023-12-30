'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.article_image, { foreignKey: 'article_id', as: 'article_images' })

      this.hasMany(models.comment, { foreignKey: 'article_id', as: 'comments' })
    }
  }
  article.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};