"use strict";

import fs, { stat } from "fs";
import path from "path";

import _ from "lodash";

import config from "../config";
import { Post } from "../models";

class SiteController {
  constructor() {
  }

  index(req, res, next) {
    let view = getViewForType("index", req.app.get("activeTheme"));

    // need settings to find frontpage id and frontpage type
    res.render(view, { foo: "bar" });
  }
}

function getViewForType(type, activeTheme) {
  let activeThemeViews = config.get("paths.themes")[activeTheme].views;
  let allowedViews = ["index"];
  let viewConfig = VIEW_CONFIG[type];

  if (viewConfig.frontPage) {
    allowedViews.unshift(viewConfig.frontPage);
  }

  let template = activeThemeViews[allowedViews[0] + ".hbs"];

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
  }
};
export default SiteController;
