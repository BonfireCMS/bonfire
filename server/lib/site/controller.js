"use strict";

const fs = require("fs");
const path = require("path");
const stat = fs.stat;

const _ = require("lodash");

const config = require("../config");
const Post = require("../models").Post;

class SiteController {
  constructor() {
  }

  index(req, res, next) {
    req.params = req.params || {};

    let viewOpts = {
      name: "index",
      pageSlug: req.params.pageSlug || null
    };

    if (req.params.pageSlug) { viewOpts.name = "page"; }
    let view = getViewForType(req.app.get("activeTheme"), viewOpts);
    // need settings to find frontpage id and frontpage type
    res.render(view, { foo: "bar" });
  }
}

function getViewForType(activeTheme, options) {
  let activeThemeViews = config.get("paths.themes")[activeTheme].views;
  let allowedViews = ["index"];

  let viewConfig = VIEW_CONFIG[options.name];

  if (viewConfig.name && viewConfig.name !== "index") {
    allowedViews.unshift(viewConfig.name);
  }

  if (viewConfig.frontPage) {
    allowedViews.unshift(viewConfig.frontPage);
  }

  let template = _.find(allowedViews, view => activeThemeViews.hasOwnProperty(view + ".hbs"));

  if (!template) {
    template = activeThemeViews[_.last(allowedViews) + ".hbs"];
  }

  return template;
}

const VIEW_CONFIG = {
  index: {
    name: "index",
    route: "/",
    frontPage: "home"
  },
  page: {
    name: "page",
    route: "/:pageSlug"
  }
};

module.exports = SiteController;
