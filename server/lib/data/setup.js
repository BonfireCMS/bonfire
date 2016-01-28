"use strict";

let firstPost = {
  name: "your-first-post",
  content: "This is your first post",
  type: "post"
};

let firstPage = {
  name: "your-first-page",
  content: "<h1>This is your first page</h1>",
  type: "page"
};

let settings = [{
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
