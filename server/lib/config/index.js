"use strict";

const fs = require("fs");
const path = require("path");

const _ = require("lodash");

const readThemes = require("../utils/read_themes");

class ConfigManager {
  constructor() {
    this._config = {};
  }

  init(raw) {
    this.set(raw);

    return readThemes(this._config.paths.themePath).then(themes => {
      this._config.paths.themes = themes;
      return this._config;
    });
  }

  load(configFile) {
    return this.readConfig(configFile).then(read => {
      return this.init(read);
    });
  }

  get(objPath) {
    if (!objPath) { return this._config; }
    return _.get(this._config, objPath);
  }

  readConfig(file) {
    let env = process.env.NODE_ENV || "development";
    let config;

    try {
      config = require(file)[env];
    } catch (err) {
      return Promise.reject(err);
    }

    return Promise.resolve(config);
  }

  set(config) {
    _.merge(this._config, config);
  }
}

module.exports = new ConfigManager();
