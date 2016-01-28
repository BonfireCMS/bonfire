"use strict";

const path = require("path");

const expect = require("chai").expect;
const sinon = require("sinon");

const fixtures = require("../fixtures");
const helpers = require("../helpers");

const Config = require("../../lib/config");
const Controller = require("../../lib/site/controller");
const models = require("../../lib/models");

describe("Controller | Site", function () {
  let config, controller, req, res;

  function bailout(done) {
    return function (err) {
      done(err);
    }
  }

  beforeEach(function () {
    controller = new Controller();
    req = {
      path: "/",
      app: {
        get() {
          return "cinder"
        }
      }
    };
    res = {};

    return helpers.setupForTesting();
  });

  afterEach(function () {
    return helpers.cleanAll();
  });

  describe("index", function () {
    it("renders home.hbs if it exists", function (done) {
      res.render = function (view) {
        expect(view).to.eql("home");
        done();
      };

      controller.index(req, res, bailout(done));
    });

    it("renders index.hbs if home doesn't exist", function (done) {
      config = Config.get();
      delete config.paths.themes.cinder.views["home.hbs"];
      res.render = function (view) {
        expect(view).to.eql("index");
        done();
      }

      controller.index(req, res, bailout(done));
    });

    it("renders home.hbs with the home post");

    it("renders index.hbs with the most recent posts");
  });

  describe("page", function () {
    beforeEach(function () {
      res.status = function () {
        return this;
      };

      return helpers.createPost({ name: "baz", type: "post" }).then(post => {
        return models.Setting.find({ where: { key: "postsPage" }}).then(setting => {
          setting.value = post.id;
          return setting.save();
        });
      });
    });

    afterEach(function () {
      return helpers.cleanAll();
    });

    it("renders a static page", function (done) {
      req.path = "/bar";
      res.render = function (view) {
        expect(view).to.eql("page");
        done();
      };

      controller.page(req, res, bailout(done));
    });

    it("renders index.hbs with posts if slug matches blog page", function (done) {
      req.path = "/baz";
      res.render = function (view) {
        expect(view).to.eql("index");
        done();
      };

      controller.page(req, res, bailout(done));
    });

    it("renders a nested route with page.hbs");

    it("renders a nested route with index.hbs if it is set as blogPage and the path matches post.path");

    it("renders page.hbs with the page post");

    it("renders index.hbs with post found by slug and paginated list of all posts");
  });
});
