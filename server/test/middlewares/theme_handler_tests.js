"use strict";

const path = require("path");

const expect = require("chai").expect;
const supertest = require("supertest");

const helpers = require("../helpers/");
const config = require("../../lib/config");
const middlewares = require("../../lib/middlewares");

describe("Middleware | theme handler", function () {
  let app, client;

  beforeEach(function () {
    return helpers.setupForTesting().then(booted => {
      app = booted;
      client = supertest(booted);
    });
  });

  afterEach(function () {
    return helpers.cleanAll();
  });

  describe("#updateActiveTheme", function () {
    beforeEach(function () {
      app.use(middlewares.themeHandler.updateActiveTheme);
      app.get("/", function (req, res, next) {
        res.end();
      });
    });

    it("sets or updates the active theme and its views", function (done) {
      client.get("/")
        .expect(200)
        .end(function (err, res) {
          if (err) { return done(err); }

          expect(app.get("activeTheme")).to.eql("cinder");
          expect(app.get("views")).to.eql(path.join(config.get("paths.themePath"), "cinder", "views"));
          done();
        });
    });
  });
});
