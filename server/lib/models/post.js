"use strict";

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    content: DataTypes.STRING(10000),
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Post;
};
