'use strict';
module.exports = (sequelize, DataTypes) => {
  var Mobil = sequelize.define('Mobil', {
    name: DataTypes.STRING,
    min_bid: DataTypes.INTEGER,
    max_bid: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.STRING
  });
  Mobil.associate = function (models) {
    Mobil.hasMany(models.bidding)
    Mobil.belongsToMany(models.User, {through: models.bidding})
  };
  return Mobil;
};