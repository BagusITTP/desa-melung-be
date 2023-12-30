'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.contact_image, { foreignKey: 'contact_id', as: 'contact_images' })
    }
  }
  contact.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    request: DataTypes.ENUM("umum", "aduan", "saran"),
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'contact',
  });
  return contact;
};