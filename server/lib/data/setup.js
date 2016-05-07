"use strict";

const firstPost = {
  title: "Your First Post",
  // HACK: setter doesn't work from seeder
  name: "your-first-post",
  content: "This is your first post",
  markdown: "# This is your first post",
  route: "/your-first-post",
  type: "post",
  status: "published"
};

const firstPage = {
  title: "Your First Page",
  // HACK: setter doesn't work from seeder
  name: "your-first-page",
  content: "<h1>This is your first page</h1>",
  markdown: "# This is your first page",
  route: "/your-first-page",
  type: "page",
  status: "published"
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
