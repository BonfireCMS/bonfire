"use strict";

module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    text: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Comment;
};
