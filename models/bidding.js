'use strict';
module.exports = (sequelize, DataTypes) => {
  var bidding = sequelize.define('bidding', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    MobilId: DataTypes.INTEGER,
    bid: DataTypes.INTEGER,
    statusWin :DataTypes.BOOLEAN,
    alreadyEmail : DataTypes.BOOLEAN
    
  });
  bidding.beforeCreate((bidding, options) => {
    bidding.bid =  Number(bidding.bid.replace(/[^0-9\.]+/g,""));
    return bidding
  });
  bidding.associate = function(models){
    bidding.belongsTo(models.Mobil)
    bidding.belongsTo(models.User)
  }
  return bidding;
};