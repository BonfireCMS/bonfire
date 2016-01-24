"use strict";

const inflection = require("inflection");

const App = require("../../lib/app");
const models = require("../../lib/models");

module.exports = function setupForTesting() {
  return initFixtures().then(() => {
    return App.boot();
  });
};

function initFixtures() {
  return Promise.all(Object.keys(fixtures).map(fixture => {
    return models[inflection.capitalize(fixture)].create(fixtures[fixture]);
  }));
}

let fixtures = {
  post: {
    content: "foo",
    type: "post",
    name: "something"
  },
  post: {
    type: "page",
    name: "bar"
  },
  setting: {
    key: "activeTheme",
    value: "cinder"
  }
};
