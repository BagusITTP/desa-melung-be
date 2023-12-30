'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.article, { foreignKey: 'article_id', as: 'article' });
    }
  }
  comment.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    message: DataTypes.TEXT,
    article_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};