"use strict";

const path = require("path");

const models = require("../../lib/models");
const setupForTesting = require("./test_setup");
const Post = models.Post;
const Setting = models.Setting;

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

function cleanAll() {
  return models.sequelize.truncate();
}

function findPostByName(name) {
  return Post.find({
    where: { name: name }
  });
};

function findSettingById(id) {
  return Setting.findById(id);
}

function createSetting(key, value) {
  return Setting.create({ key: key, value: value });
};

function createPost(data) {
  return Post.create(data);
}

function setFrontPage() {
  return Setting.find({ where: { key: "frontPageType" }}).then(type => {
    type.value = "page";
    return type.save();
  }).then(function () {
    return Post.create({ name: "my-front-page" });
  }).then(post => {
    return Setting.find({ where: { key: "frontPage" }}).then(page => {
      page.value = post.id;
      return page.save();
    });
  });
}

module.exports = {
  cleanAll,
  createPost,
  createSetting,
  findPostByName,
  findSettingById,
  initHelpers,
  setFrontPage,
  setupForTesting
};
