"use strict";

import path from "path";

import { expect } from "chai";
import sinon from "sinon";

import fixtures from "../fixtures";
import Config from "../../lib/config";
import Controller from "../../lib/site/controller";

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
  });

  describe("index", function () {
    let post;

    beforeEach(function () {
      return Config.load(path.resolve(__dirname, "../../../config")).then(() => {
        return createPost(fixtures.post2)
      }).then(created => {
        post = created;
      });
    });

    afterEach(function () {
      return post.destroy();
    });

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
  });
});
