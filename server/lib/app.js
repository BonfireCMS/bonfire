"use strict";

const http = require("http");
// https?
const path = require("path");

const busBoy = require("express-busboy");
const express = require("express");

const Config = require("./config");
const Router = require("./router");
const SiteController = require("./site/controller");
const middlewares = require("./middlewares");
const models = require("./models");
const setup = require("./data/setup");
const siteController = new SiteController();
const utils = require("./utils");

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

  boot() {
    return models.Post.bulkCreate([setup.firstPost, setup.firstPage]).then(() => {
      return models.Setting.bulkCreate(setup.settings);
    }).then(() => {
      return Config.load(path.resolve(__dirname, "../../config.js"));
    }).then(() => {
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
      this.resource("settings");
    });

    this.blogRouter = express.Router();
    this.blogRouter.use(middlewares.themeHandler.updateActiveTheme);
    this.blogRouter.route("/").get(siteController.index);
    this.blogRouter.get("*", siteController.page);
    this.app.use(this.apiBase, this.apiRouter.getRouter());
    this.app.use("/", this.blogRouter);
    this.app.use((err, req, res) => {
      const activeThemeViews = Config.get("paths.themes")[this.app.get("activeTheme")].views;
      let responseCode;

      if (err instanceof Error && err.body && err.body.code) {
        responseCode = utils.statusFromCode(err.body.code);

        if (activeThemeViews.hasOwnProperty(responseCode + ".hbs")) {
          res.status(responseCode).render(responseCode);
        } else {
          const helpers = Config.get("paths.helpers");

          res.status(responseCode).render(path.join(helpers, responseCode + ".hbs"));
        }
      } else {
        // add logging
        console.error(err.stack);
      }

    });
  }
}

module.exports = new App();
