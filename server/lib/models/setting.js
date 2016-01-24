"use strict";

module.exports = function(sequelize, DataTypes) {
  const Setting = sequelize.define("Setting", {
    key: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Setting;
};
