"use strict"

const path = require("path");

const hbs = require("express-hbs");

const Setting = require("../models").Setting;
const config = require("../config");

function updateActiveTheme(req, res, next) {
  Setting.find(keyQuery("activeTheme")).then(activeTheme => {
    if (activeTheme.value !== req.app.get("activeTheme")) {
      activateTheme(activeTheme.value, req.app);
    }
    next();
  }).catch(next);
}

function activateTheme(activeTheme, blogApp) {
  const activeThemePath = path.resolve(config.get("paths.themePath"), activeTheme, "views");
  const hbsOptions = {
    // add helpers
    partialsDir: path.join(activeThemePath, "partials")
  };

  blogApp.engine("hbs", hbs.express4(hbsOptions));
  blogApp.set("activeTheme", activeTheme);
  blogApp.set("views", activeThemePath);
}

function keyQuery(key) {
  return {
    where: {
      key: key
    }
  };
}

module.exports = {
  updateActiveTheme
};
