"use strict";

import path from "path";

import { expect } from "chai";

import config from "../lib/config";

const CONFIG_PATH = path.resolve(__dirname, "../../config.js");

describe("config", function () {
  let loadedConfig;

  beforeEach(function () {
    return config.load(CONFIG_PATH).then(loaded => {
      loadedConfig = loaded;
    });
  });

  describe("#load", function () {
    it("loads a config file from the file system", function () {
      expect(loadedConfig.paths.contentPath).to.eql(path.resolve(__dirname, "../../content"));
    });
  });

  describe("#init", function () {
    it("initializes config values and returns the config object", function () {
      expect(loadedConfig).to.be.an("object");
      expect(loadedConfig.paths.themes).to.have.key("cinder");
    });
  });

  describe("paths", function () {
    it("has all valid keys", function () {
      let pathConfig = loadedConfig.paths;

      expect(pathConfig).to.have.keys([
          "contentPath",
          "themePath",
          "themes"
      ]);
    });
  });

  describe("#get", function () {
    it("returns a config value from 'path'", function () {
      expect(config.get("paths.contentPath")).to.eql(path.resolve(__dirname, "../../content"));
    });

    it("returns the entire config object if no path is given", function () {
      expect(config.get()).to.eql(loadedConfig);
    });
  });

  describe("#set", function () {
    it("sets a config item at a single path", function () {
      config.set({ foo: "bar" });
      expect(config.get("foo")).to.eql("bar");
    });

    it("sets a config item at a nested path", function () {
      config.set({ foo: { bar: "baz" }});
      expect(config.get("foo.bar")).to.eql("baz");
    });
  });
});
