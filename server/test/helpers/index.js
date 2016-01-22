"use strict";

const path = require("path");

const models = require("../../lib/models");
const Post = models.Post;

function initHelpers() {
  global.createPost = function (postData) {
    return Post.create(postData);
  };

  global.cleanAll = function () {
    return Post.findAll().then(records => {
      return Promise.all(records.map(record => record.destroy()));
    });
  };

  global.findPostById = function (id) {
    return Post.findById(id);
  };

  global.getFixturePath = function (what) {
    return path.resolve(__dirname, "../fixtures", what);
  }
}

module.exports = {
  initHelpers
};
