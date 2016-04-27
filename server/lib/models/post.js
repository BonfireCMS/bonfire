"use strict";

const inflection = require("inflection");

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    content: DataTypes.STRING(10000),
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        let name = this.getDataValue("name");

        if (name) { name = inflection.dasherize(name.toLowerCase()) }
        return name;
      }
    },
    route: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "draft"
    },
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
