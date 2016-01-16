"use strict";

import fs from "fs";
import http from "http";
// https?
import path from "path";

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
    this.app.set("themePath", THEMES_PATH);
    this._server = http.createServer(this.app);

    this._initializeViews();
    this._initializeRoutes();
  }

  boot(done) {
    // load middlewares
    // load routes
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
    this.router = Router.map({}, function () {
      this.route("posts", { path: "/posts" });
    });

    this.app.use("/", this.router.router);
  }

  _initializeViews() {
    let app = this.app;

    let viewOpts = this.viewOpts || {};
    viewOpts.engine = viewOpts.engine || "hbs";
    let activeTheme = app.get("activeTheme") || "cinder";
    let viewsPath = path.join(app.get("themePath"), activeTheme, "views");
    app.set("views", viewsPath);
    app.set("view engine", viewOpts.engine);
    const footer = fs.readFileSync(path.join(viewsPath, "footer.hbs")).toString();
    const header = fs.readFileSync(path.join(viewsPath, "header.hbs")).toString();
    hbs.registerPartial("header", header);
    hbs.registerPartial("footer", footer);
    hbs.registerHelper("bonfireNav", function () {
    });
  }
}

module.exports = App;
