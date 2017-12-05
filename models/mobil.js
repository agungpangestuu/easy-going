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
    Mobil.belongsTo(models.User)
    Mobil.belongsToMany(models.User, {through: 'bidding'})
  };
  return Mobil;
};