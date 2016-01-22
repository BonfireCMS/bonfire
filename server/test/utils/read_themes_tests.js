"use strict";

const paht = require("path");

const expect = require("chai").expect;

const readThemes = require("../../lib/utils/read_themes");

const NESTED_DIR = getFixturePath("utils/nested_dir");
const THEMES_PATH = getFixturePath("themes");

describe("Util | read-theme", function () {
  it("returns available themes and their views", function () {
    return readThemes(THEMES_PATH).then(themes => {
      expect(themes.cinder).to.be.an("object");
    });
  });

  it("only reads themes if they are a directory", function () {
    return readThemes(NESTED_DIR).then(themes => {
      expect(themes).to.not.have.key("index.js");
    });
  });
});
