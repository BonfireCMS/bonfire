"use strict";

const path = require("path");

module.exports = {
  development: {
    paths: {
      contentPath: path.join(__dirname, "content"),
      themePath: path.join(__dirname, "content/themes"),
      helpers: path.join(__dirname, "server/lib/helpers")
    }
  },
  production: {
    paths: {
      contentPath: path.join(__dirname, "content"),
      themePath: path.join(__dirname, "content/themes"),
      helpers: path.join(__dirname, "server/lib/helpers")
    }
  }
};
