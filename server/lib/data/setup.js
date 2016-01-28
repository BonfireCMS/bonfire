"use strict";

const firstPost = {
  name: "your-first-post",
  content: "This is your first post",
  type: "post"
};

const firstPage = {
  name: "your-first-page",
  content: "<h1>This is your first page</h1>",
  type: "page"
};

const settings = [{
  key: "activeTheme",
  value: "cinder"
}, {
  key: "frontPageType",
  value: "posts"
}, {
  key: "frontPage",
  value: null
}, {
  key: "postsPage",
  value: null
}];

module.exports = {
  firstPost,
  firstPage,
  settings
};
