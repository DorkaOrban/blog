'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      birthday: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING
      },
      passwordHash: {
        type: Sequelize.STRING,
        required: false,
        allowNull: true
      },
      salt: {
        type: Sequelize.STRING,
        required: false,
        allowNull: true
      },
      fullName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};