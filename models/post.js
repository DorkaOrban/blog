'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {type: DataTypes.STRING, required: true, allowNull: false},
    content: {type: DataTypes.STRING, required: true, allowNull: false},
    date: {type: DataTypes.DATE, required: true, allowNull: false, default: Date.now()},
    author:{type: DataTypes.STRING, required: true,allowNull: false},
    img: DataTypes.STRING
  }, {});
  Post.associate = models => {
    // associations can be defined here
    Post.belongsTo(models.User,{
      foreignKey:'id',
      onDelete:'CASCADE',
    });
  };
  return Post;
};