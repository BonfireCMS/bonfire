"use strict";

import fs from "fs";
import path from "path";

import express from "express";
import includeAll from "include-all";
import inflection from "inflection";

class Router {
  constructor(options) {
    this.api = "/api/v1";
    this.router = express.Router();
    this.controllers = new Map();

    options = options || {};
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

  route(path, opts) {
    let withOpts = opts.with;
    let controller = withOpts.split(":")[0];
    let action = withOpts.split(":")[1];
    opts.controller = this.controllers.get(controller);
    this._bindRoute(path, opts.using, opts.controller[action]);
  }

  resource(resourceName) {
    let controller = this.controllers.get(resourceName);
    let pluralResourceName = inflection.pluralize(resourceName);
    let singularResourceName = inflection.singularize(resourceName);

    this._bindRoutes(pluralResourceName, singularResourceName, controller);
  }

  _bindRoute(path, method, action) {
    this.router[method](path, action);
  }

  _bindRoutes(pluralName, singularName, controller) {
    this._bindRoute(`/${pluralName}`, "get", controller.index.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "get", controller.show.bind(controller));
    this._bindRoute(`/${pluralName}`, "post", controller.create.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "put", controller.update.bind(controller));
    this._bindRoute(`/${pluralName}/:id`, "delete", controller.destroy.bind(controller));
  }

  static map(options, callback) {
    let router = new Router(options);
    return router;
    /*if (!callback) {
      callback = options;
      options = {};
    }

    let router = new Router(options);
    callback.call(router);
    return router;
    */
  }
}

export default Router;
