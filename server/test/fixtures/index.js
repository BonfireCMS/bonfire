"use strict";

const path = require("path");

const post1 = {
  content: "foo",
  type: "post",
  name: "foo"
};

const post2 = {
  type: "page",
  name: "bar"
};

module.exports = {
  config: path.resolve(__dirname, "config/config.js"),
  post1,
  post2
};
