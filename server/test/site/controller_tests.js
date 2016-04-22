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

    it("renders the view with posts by default", function (done) {
      res.render = function (view, context) {
        expect(context.posts).to.have.length.above(0);
        done();
      };

      controller.index(req, res, bailout(done));
    });

    it("renders the view with the view's post if set to static", function (done) {
      helpers.setFrontPage().then(function () {
        res.render = function (view, context) {
          expect(context.post.name).to.eql("my-front-page");
          done();
        };

        controller.index(req, res, bailout(done));
      }).catch(done);
    });
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

    it("renders post.hbs with a post", function (done) {
      req.path = "/something";
      res.render = function (view) {
        expect(view).to.eql("post");
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

    it("renders a nested route with page.hbs", function (done) {
      helpers.createPost({
        type: "page",
        name: "bird",
        route: "/nested/bird"
      }).then(post => {
        req.path = "/nested/bird";
        res.render = function (view) {
          expect(view).to.eql("page");
          done();
        }

        controller.page(req, res, bailout(done));
      }).catch(done);
    });

    it("renders a nested route with index.hbs if it is set as blogPage and the path matches post.path", function (done) {
      helpers.createPost({
        type: "page",
        name: "bird",
        route: "/nested/bird"
      }).then(post => {
        return helpers.setBlogPage(post.id);
      }).then(() => {
        req.path = "/nested/bird";
        res.render = function (view) {
          expect(view).to.eql("index");
          done();
        }

        controller.page(req, res, bailout(done));
      }).catch(done);
    });

    it("renders index.hbs with post found by slug and list of all posts", function (done) {
      let onlyPost;

      helpers.findPostByName("something").then(post => {
        onlyPost = post;
        return helpers.setBlogPage(post.id);
      }).then(() => {
        req.path = "/something";
        res.render = function (view, context) {
          expect(view).to.eql("index");
          expect(context.post).to.eql(onlyPost);
          expect(context.posts).to.have.length(2);
          done();
        }

        controller.page(req, res, bailout(done));
      }).catch(done);
    });

    it("returns a 404 if the post does not exist", function (done) {
      req.path = "/foo";

      controller.page(req, res, function (err) {
        expect(err.body.code).to.eql("NotFoundError");
        done();
      });
    });

    it("returns a 404 if a nested route does not exist", function (done) {
      req.path = "/foo/bar";

      controller.page(req, res, function (err) {
        expect(err.body.code).to.eql("NotFoundError");
        done();
      });
    });
  });
});
