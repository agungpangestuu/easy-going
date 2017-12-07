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
  
Mobil.prototype.getTimeLeft = function () {
  let now = new Date(this.createdAt)
  let time = new Date(now.setMinutes(now.getMinutes() + this.time))
  return `${time.getDate()}-${time.getMonth()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
};
    


  Mobil.associate = function (models) {
    Mobil.hasMany(models.bidding)
    Mobil.belongsToMany(models.User, {through: models.bidding})
  };
  return Mobil;
};