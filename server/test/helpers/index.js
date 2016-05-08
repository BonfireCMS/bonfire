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

function findPostById(id) {
  return Post.findById(id);
}

function findSettingById(id) {
  return Setting.findById(id);
}

function createSetting(key, value) {
  return Setting.create({ key: key, value: value });
};

function createPost(data) {
  return Post.create(data);
}

function setBlogPage(id) {
  return Setting.find({ where: { key: "postsPage" }}).then(page => {
    page.value = id;
    return page.save();
  });
}

function setFrontPage() {
  return Setting.find({ where: { key: "frontPageType" }}).then(type => {
    type.value = "page";
    return type.save();
  }).then(function () {
    return Post.create({ title: "My Front Page" });
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
  findPostById,
  findPostByName,
  findSettingById,
  initHelpers,
  setBlogPage,
  setFrontPage,
  setupForTesting
};
