"use strict";

import fs from "fs";
import http from "http";
// https?
import path from "path";

import bodyParser from "body-parser";
import busBoy from "express-busboy";
import express from "express";
import hbs from "hbs";

import Router from "./router";

const THEMES_PATH = path.resolve(__dirname, "..", "..", "content/themes");

class App {
  constructor(options) {
    options = options || {};
    this.options = options;
    this.app = express();
    this.app.set("port", process.env.PORT || options.port || 3000);
    this.apiBase = "/api/v1";
    this._server = http.createServer(this.app);

    this.app.use(bodyParser.json());

    this._initializeRoutes();
    // load middlewares
  }

  boot(done) {
    this._server.listen(this.app.get("port"), function (err) {
      if (err) {
        if (done) { done(err); }
        throw err;
      }

      if (done) {
        done();
        return;
      }
    });
  }

  getApp() {
    return this.app;
  }

  _initializeRoutes() {
    this.router = Router.map(function () {
      this.resource("posts");
    });

    this.app.use(this.apiBase, this.router.getRouter());
  }
}

module.exports = App;
