'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email : 'John',
      password : 'Doe',
      role: 'Renter',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      email : 'John',
      password : 'Snow',
      role: 'Renter',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
