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
      it("returns a 404 for missing page", function (done) {
        client.get("/foo")
          .expect(404)
          .expect("Content-Type", /html/)
          .end(done);
      });

      xit("serves the content for Page", function (done) {
        client.get("/bar")
          .expect(200)
          .expect("Content-Type", /html/)
          .end(done);
      });
    });
  });
});
