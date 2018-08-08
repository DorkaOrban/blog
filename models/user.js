'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {type: DataTypes.STRING, required: true, unique: true, allowNull: false},
    birthday: DataTypes.DATE,
    email: {type: DataTypes.STRING, required: true, unique: true, allowNull: false},
    fullName: {type: DataTypes.STRING, required: true},
    passwordHash: {type: DataTypes.STRING, required: true},
    salt: {type: DataTypes.STRING, required: true},
  }, {});
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Post,{
      foreignKey:'author',
      as: 'posts',
    });

  };
  return User;
};