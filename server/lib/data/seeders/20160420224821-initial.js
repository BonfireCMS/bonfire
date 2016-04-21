"use strict";

const setup = require("../setup");
const posts = [setup.firstPost, setup.firstPage];
const settings = setup.settings;
const models = { Posts: posts, Settings: settings };

module.exports = {
  up(queryInterface, Sequelize) {
    const inserts = [];

    models.Posts.forEach(post => {
      post.createdAt = new Date();
      post.updatedAt = new Date();
      inserts.push({ type: "Posts", data: post });
    });

    models.Settings.forEach(setting => {
      setting.createdAt = new Date();
      setting.updatedAt = new Date();
      inserts.push({ type: "Settings", data: setting });
    });

    return Promise.all(inserts.map(insert => {
      return queryInterface.bulkInsert(insert.type, [insert.data]);
    }));
  },

  down(queryInterface, Sequelize) {
    const deletes = [];

    models.Posts.forEach(post => {
      deletes.push({ type: "Posts", data: post });
    });

    models.Settings.forEach(setting => {
      deletes.push({ type: "Settings", data: setting });
    });

    return Promise.all(deletes.map(del => {
      return queryInterface.bulkDelete(del.type, del.data);
    }));
  }
};
