'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
    
  });
  User.associate = function (models) {
    User.hasMany(models.Mobil)
    User.belongsToMany(models.Mobil, {through: 'bidding'})
  };
  return User;
};