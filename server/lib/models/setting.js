"use strict";

module.exports = function(sequelize, DataTypes) {
  const Setting = sequelize.define("Setting", {
    settingKey: DataTypes.STRING,
    settingValue: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Setting;
};
