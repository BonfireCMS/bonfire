"use strict";

const path = require("path");

const express = require("express");
const includeAll = require("include-all");
const inflection = require("inflection");

class Router {
  constructor(options) {
    options = options || {};
    this.controllers = new Map();
    this.controllersPath = options.controllersPath || path.resolve(__dirname, "controllers");
    this.options = options;
    this.router = express.Router();

    this._initializeControllers();
  }

  _initializeControllers() {
    const controllers = includeAll({
      dirname: this.controllersPath,
      filter: /(.+)_controller\.js$/
    });

    Object.keys(controllers).forEach(controller =>
      this.controllers.set(controller, new controllers[controller]())
    );
  }

  getRouter() {
    return this.router;
  }

  namespace() {
  }

  resource(resourceName, options) {
    options = options || {};
    const controller = this.controllers.get(resourceName);
    const route = options.path || resourceName;
    const resourceFromPath = this._getResourceFromPath(route);
    const singularResource = inflection.singularize(resourceFromPath);
    const pluralResource = inflection.pluralize(resourceFromPath);
    this._bindRoutes(singularResource, pluralResource, controller);
  }

  route(resourceName, opts) {
    const withOpts = opts.with;
    const controller = withOpts.split(":")[0];
    const action = withOpts.split(":")[1];
    opts.controller = this.controllers.get(controller);
    this._bindRoute(resourceName, opts.using, opts.controller[action]);
  }

  _bindRoute(route, method, action) {
    this.router[method](route, action);
  }

  _bindRoutes(singularName, pluralName, controller) {
    this._bindRoute(`/${pluralName}`, "get", controller.index.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "get", controller.show.bind(controller));
    this._bindRoute(`/${pluralName}`, "post", controller.create.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "put", controller.update.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "delete", controller.destroy.bind(controller));
  }

  _getResourceFromPath(route) {
    return route.replace("/", "");
    // check if it has a slash
  }

  static map(options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    }

    const router = new Router(options);
    callback.call(router);
    return router;
  }
}

module.exports = Router;
