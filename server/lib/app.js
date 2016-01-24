"use strict";

const fs = require("fs");
const http = require("http");
// https?
const path = require("path");

const busBoy = require("express-busboy");
const express = require("express");
const hbs = require("hbs");

const Config = require("./config");
const middlewares = require("./middlewares");
const Router = require("./router");
const SiteController = require("./site/controller");
const siteController = new SiteController();

class App {
  constructor(options) {
    options = options || {};
    this.app = express();
    this.app.set("port", process.env.PORT || options.port || 3000);
    this.app.set("view engine", "hbs");
    this.version = "v1";
    this.apiBase = `/api/${this.version}`;
    this._server = http.createServer(this.app);

    busBoy.extend(this.app);

    // load middlewares
    this._initializeRoutes();
  }

  boot(done) {
    return Config.load(path.resolve(__dirname, "../../config.js")).then(config => {
      // load middlewares and things
      return this.app;
    });
  }

  getApp() {
    return this.app;
  }

  _initializeRoutes() {
      /**
       * init routes:
       *   - adminRouter: router for the admin area (Ember application)
       *   - apiRouter: REST api (/users, /posts, etc)
       *   - blogRouter: router for the user's site
       */
      this.apiRouter = Router.map(function () {
        this.resource("posts");
      });

      this.blogRouter = express.Router();
      this.blogRouter.use(middlewares.themeHandler.updateActiveTheme);
      this.blogRouter.route("/").get(siteController.index);
      this.blogRouter.get("*", siteController.page);
      this.app.use(this.apiBase, this.apiRouter.getRouter());
      this.app.use("/", this.blogRouter);
  }
}

module.exports = new App();
