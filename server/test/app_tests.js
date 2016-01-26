"use strict";

const expect = require("chai").expect;
const supertest = require("supertest");

const helpers = require("./helpers");

const App = require("../lib/app");

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
