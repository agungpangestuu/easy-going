'use strict';
module.exports = (sequelize, DataTypes) => {
  var bidding = sequelize.define('bidding', {
    UserId: DataTypes.INTEGER,
    MobilId: DataTypes.INTEGER,
    bid: DataTypes.INTEGER
  });
  bidding.associate = function(models){
    bidding.belongsTo(models.Mobil)
    bidding.belongsTo(models.User)
  }
  return bidding;
};