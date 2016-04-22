"use strict";

const errors = require("restify-errors");

const BaseController = require("../controller");

class SettingsController extends BaseController {
  constructor() {
    super(...arguments);
    this.model = this.loadModel("Setting");
  }

  index(req, res, next) {
    return this.model.findAll().then(records => {
      return this.formatResponse(records);
    }).then(response => {
      res.status(200).send(response);
      next();
    }).catch(next);
  }

  show(req, res, next) {
    const settingId = req.params.id;

    this.model.findById(settingId).then(setting => {
      if (!setting) {
        throw new this.Errors.ResourceNotFoundError(
            `The resource ${this.model.name}:${req.params.id} does not exist`
        );
      }

      return this.formatResponse(setting);
    }).then(response => {
      res.status(200).send(response);
    }).catch(err => {
      let code = this.codeFromError(err);
      res.status(code).send(err.body);
      next();
    }).catch(next);
  }

  create(req, res, next) {
    const payload = req.body[this.resourceRoot];

    if (!payload) { return next(new errors.BadRequestError()); }

    this.model.create(payload).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(201).send(response);
    }).catch(next);
  }

  update(req, res, next) {
    const id = req.params.id;
    const payload = req.body[this.resourceRoot];

    if (!payload) { return next(new errors.BadRequestError()); }

    this.model.findById(id).then(record => {
      return record.updateAttributes(payload);
    }).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  destroy(req, res, next){
    const id = req.params.id;

    this.model.findById(id).then(record => {
      return record.destroy();
    }).then(function () {
      res.status(204).send();
    }).catch(next);
  }
}

module.exports = SettingsController;
