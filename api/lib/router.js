"use strict";

import fs from "fs";
import path from "path";

import express from "express";
import includeAll from "include-all";
import inflection from "inflection";

class Router {
  constructor(options) {
    this.router = express.Router();
    this.controllers = new Map();

    options = options || {};
    this.options = options;
    this.controllersPath = options.controllersPath || path.resolve(__dirname, "controllers");

    this._initializeControllers();
  }

  _initializeControllers() {
    let controllers = includeAll({
      dirname: this.controllersPath,
      filter: /(.+)_controller\.js$/
    });

    Object.keys(controllers).forEach(controller => this.controllers.set(controller, new controllers[controller].default()));
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

export default Router;
