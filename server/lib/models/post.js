"use strict";

const errors = require("restify-errors");
const inflection = require("inflection");

module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    // TODO: bump size
    content: DataTypes.STRING(10000),
    markdown: DataTypes.STRING(10000),
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    route: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "draft"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(title) {
        this.setDataValue("title", title);
        this.setDataValue("name", inflection.dasherize(title.toLowerCase()));
      },
      validate: {
        isUnique(title, next) {
          const name = inflection.dasherize(title.toLowerCase());

          return Post.find({ where: { name }}).then(post => {
            if (post) {
              const message = `resource 'post' with name '${title}' already exists`;

              return next(new errors.UnprocessableEntityError(message));
            }

            next();
          });
        }
      }
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
