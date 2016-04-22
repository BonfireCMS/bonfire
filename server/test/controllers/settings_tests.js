"use strict";

const expect = require("chai").expect;
const supertest = require("supertest");

const helpers = require("../helpers");
const models = require("../../lib/models");

const App = require("../../lib/app");

describe("Controller | Settings", function () {
  let client;

  beforeEach(function () {
    return helpers.setupForTesting().then(app => {
      client = supertest(app);
    });
  });

  afterEach(function () {
    return helpers.cleanAll();
  });

  describe("GET /settings", function () {
    it("returns an empty set if no settings exist", function (done) {
      helpers.cleanAll().then(function () {
        client.get("/api/v1/settings")
          .expect(200, {
            settings: []
          })
          .end(done);
      }).catch(done);
    });

    it("returns all settings", function (done) {
      client.get("/api/v1/settings")
        .expect(200)
        .end(function (err, res) {
          if (err) { return done(err); }

          let settings = res.body.settings;
          expect(settings).to.have.length.gt(0);
          done();
        });
    });
  });

  describe("GET /settings/:id", function () {
    it("returns a setting by id", function (done) {
      models.Setting.findAll().then(settings => {
        client.get(`/api/v1/settings/${settings[0].id}`)
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err); }

            let setting = res.body.setting;

            expect(setting.key).to.eql("activeTheme");
            done();
          });
      }).catch(done);
    });

    it("returns a 404 if not setting is found", function (done) {
      client.get("/api/v1/settings/1")
        .expect(404)
        .end(done);
    });
  });

  describe("POST /settings", function () {
    it("creates a new setting", function (done) {
      client.post("/api/v1/settings")
        .send({
          setting: {
            key: "foo",
            value: "bar"
          }
        })
        .expect(201)
        .end(function (err, res) {
          if (err) { return done(err); }

          let setting = res.body.setting;

          expect(setting.key).to.eql("foo");
          expect(setting.value).to.eql("bar");
          done();
        });
    });
  });

  describe("PUT /settings/:id", function () {
    it("updates a setting", function (done) {
      models.Setting.findAll().then(settings => {
        client.put(`/api/v1/settings/${settings[0].id}`)
          .send({
            setting: {
              value: "something"
            }
          })
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err); }

            let setting = res.body.setting;

            expect(setting.key).to.eql("activeTheme");
            expect(setting.value).to.eql("something");
            done();
          });
      }).catch(done);
    });

    it("only allows the value to be updated");
  });

  describe("DELETE /settings/:id", function () {
    it("destroys a setting by id", function (done) {
      models.Setting.findAll().then(settings => {
        client.delete(`/api/v1/settings/${settings[0].id}`)
          .expect(204)
          .end(function (err, res) {
            if (err) { return done(err); }

            helpers.findSettingById(settings[0].id).then(record => {
              expect(record).to.be.null;
              done();
            }).catch(done);
          });
      });
    });

    it("returns a 404 if the record doesn't exist");
  });
});
