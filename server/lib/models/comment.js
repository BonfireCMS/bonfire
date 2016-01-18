"use strict";

module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    data: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Comment;
};
