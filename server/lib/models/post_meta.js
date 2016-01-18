"use strict";

module.exports = function(sequelize, DataTypes) {
  const PostMeta = sequelize.define("PostMeta", {
    metaKey: DataTypes.STRING,
    metaValue: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return PostMeta;
};
