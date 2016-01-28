"use strict";

const _ = require("lodash");
const expect = require("chai").expect;
const supertest = require("supertest");

const helpers = require("./helpers");

const App = require("../lib/app");
const models = require("../lib/models");

describe("App", function () {
  let client;

  beforeEach(function () {
    return helpers.setupForTesting().then(app => {
      client = supertest(app);
    });
  });

  afterEach(function () {
    return helpers.cleanAll();
  });

  describe("#boot", function () {
    it("returns the internal app", function () {
      return helpers.cleanAll().then(function () {
        return App.boot();
      }).then(booted => {
        expect(booted).to.have.property("listen");
      });
    });

    it("sets up first posts", function () {
      return helpers.cleanAll().then(function () {
        return App.boot();
      }).then(booted => {
        return models.Post.findAll();
      }).then(posts => {
        expect(posts).to.have.length(2);
        let page = _.find(posts, post => post.type === "page");
        expect(page.name).to.eql("your-first-page");
      });
    });

    it("sets up initial settings", function () {
      return helpers.cleanAll().then(function () {
        return App.boot();
      }).then(function () {
        return models.Setting.findAll();
      }).then(settings => {
        let activeTheme = _.find(settings, setting => setting.key === "activeTheme");
        let frontPage = _.find(settings, setting => setting.key === "frontPage");
        let frontPageType = _.find(settings, setting => setting.key === "frontPageType");
        let postsPage = _.find(settings, setting => setting.key === "postsPage");

        expect(activeTheme.value).to.eql("cinder");
        expect(frontPage.value).to.be.null;
        expect(frontPageType.value).to.eql("posts");
        expect(postsPage.value).to.be.null;
      });
    });
  });

  describe("routing", function () {
    describe("GET /", function () {
      it("serves the content for Home", function (done) {
        client.get("/")
          .expect(200)
          .expect("Content-type", /html/)
          .end(done);
      });
    });

    describe("GET /:slug", function () {
      beforeEach(function () {
        return helpers.createPost({ name: "baz", type: "post" }).then(post => {
          return helpers.createSetting("blogPage", post.id);
        });
      });

      it("returns a 404 for missing page", function (done) {
        client.get("/foo")
          .expect(404)
          .end(done);
      });

      it("serves the content for Page", function (done) {
        client.get("/baz")
          .expect(200)
          .expect("Content-Type", /html/)
          .end(done);
      });
    });
  });
});
