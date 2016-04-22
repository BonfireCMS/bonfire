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
  return Promise.all(fixtures.map(fixture => {
    return models[inflection.capitalize(fixture.type)].create(fixture.data);
  }));
}

const fixtures = [{
  type: "post",
  data: {
    content: "foo",
    type: "post",
    name: "something"
  }
}, {
  type: "post",
  data: {
    type: "page",
    name: "bar"
  }
}, {
  type: "setting",
  data: {
    key: "activeTheme",
    value: "cinder"
  }
}, {
  type: "setting",
  data: {
    key: "frontPageType",
    value: "posts"
  }
}, {
  type: "setting",
  data: {
    key:"frontPage",
    value: null
  }
}, {
  type: "setting",
  data: {
    key:"postsPage",
    value: null
  }
}]
