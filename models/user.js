'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type :DataTypes.STRING,
      validate : {
        isEmail : true
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    alreadyWin : DataTypes.BOOLEAN
  });
  
  User.beforeCreate((user, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      user.password = hash
    });
  });
  
  User.associate = function (models) {
    User.hasMany(models.bidding)
    User.belongsToMany(models.Mobil, {through: models.bidding})
  };
  return User;
};