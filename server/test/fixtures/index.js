"use strict";

const path = require("path");

const post1 = {
  content: "foo",
  type: "post"
};

const post2 = {
  type: "page"
};

module.exports = {
  config: path.resolve(__dirname, "config/config.js"),
  post1,
  post2
};
