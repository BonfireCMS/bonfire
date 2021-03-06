"use strict";

const path = require("path");

const expect = require("chai").expect;

const NESTED_DIR = getFixturePath("utils/nested_dir");

const readDir = require("../../lib/utils/read_directory");

describe("Util | read-directory", function () {
  it("reads a directory and returns its content", function () {
    return readDir(NESTED_DIR).then(tree => {
      expect(tree["index.js"]).to.eql(path.join(getFixturePath("utils/nested_dir"), "index.js"));
    });
  });

  it("reads a directory recursively", function() {
    return readDir(NESTED_DIR).then(tree => {
      expect(tree.second_nested_dir).to.have.key("index2.js");
    });
  });
});
