'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seat.init({
    seat_normal: DataTypes.JSONB,
    seat_vip: DataTypes.JSONB,
    seat_couple: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};