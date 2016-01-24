"use strict";

const fs = require("fs");
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
    let controllers = includeAll({
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
    let controller = this.controllers.get(resourceName);
    let path = options.path || resourceName;
    let resourceFromPath = this._getResourceFromPath(path);
    let singularResource = inflection.singularize(resourceFromPath);
    let pluralResource = inflection.pluralize(resourceFromPath);
    this._bindRoutes(singularResource, pluralResource, controller);
  }

  route(path, opts) {
    let withOpts = opts.with;
    let controller = withOpts.split(":")[0];
    let action = withOpts.split(":")[1];
    opts.controller = this.controllers.get(controller);
    this._bindRoute(path, opts.using, opts.controller[action]);
  }

  _bindRoute(path, method, action) {
    this.router[method](path, action);
  }

  _bindRoutes(singularName, pluralName, controller) {
    this._bindRoute(`/${pluralName}`, "get", controller.index.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "get", controller.show.bind(controller));
    this._bindRoute(`/${pluralName}`, "post", controller.create.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "put", controller.update.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "delete", controller.destroy.bind(controller));
  }

  _getResourceFromPath(path) {
    return path.replace("/", "");
    // check if it has a slash
  }

  static map(options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    }

    let router = new Router(options);
    callback.call(router);
    return router;
  }
}

module.exports = Router;
