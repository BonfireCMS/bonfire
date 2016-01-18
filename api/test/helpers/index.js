"use strict";

import startApp from "./start_app";

import {
  Post
} from "../../lib/models";

export function initHelpers() {
  global.createPost = function (postData) {
    return Post.create(postData);
  };

  global.cleanAll = function () {
    return Post.findAll().then(records => {
      return Promise.all(records.map(record => record.destroy()));
    });
  };
}

export {
  initHelpers,
  startApp
}
