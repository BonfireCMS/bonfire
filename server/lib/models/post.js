"use strict";

const errors = require("restify-errors");
const inflection = require("inflection");

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    content: DataTypes.STRING(10000),
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        let name = this.getDataValue("name");

        if (name) { name = inflection.dasherize(name.toLowerCase()) }
        return name;
      },
      validate: {
        isUnique(name, next) {
          return Post.find({ where: { name }}).then(post => {
            if (post) {
              const message = `resource 'post' with name '${name}' already exists`;

              return next(new errors.UnprocessableEntityError(message));
            }

            next();
          });
        }
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
