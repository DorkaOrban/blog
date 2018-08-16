'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: 'Girlboss moves',
      content: "Be a Girlboss, be you!",
      date: new Date(),
      author: 'Dorka Orban',
      createdAt: new Date(),
      updatedAt: new Date(),
      img: ''
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
