"use strict";

const _ = require("lodash");
const inflection = require("inflection");
const RestifyErrors = require("restify-errors");

const Models = require("./models");

class BaseController {
  constructor() {
    this.modelManager = new Map();

    Object.keys(Models).forEach(model => {
      this.modelManager.set(model, Models[model]);
    });
  }

  index(req, res, next) {
    let query = req.query;

    this.model.findAll({ where: query }).then(records => {
      return this.formatResponse(records);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  show(req, res, next) {
    this.model.findById(req.params.id).then(record => {
      if (!record) {
        const message = `resource '${this.resourceRoot}' with id '${req.params.id}' does not exist`;

        throw new this.Errors.NotFoundError(message);
      }

      return this.formatResponse(record);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  create(req, res, next) {
    const payload = req.body[this.resourceRoot];

    if (!payload) { return next(new this.Errors.BadRequestError()); }

    const instance = this.model.build(payload);

    instance.validate().then(error => {
      if (error) {
        const message = _.first(error.errors).message;

        throw new this.Errors.UnprocessableEntityError(message);
      }

      return instance.save();
    }).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(201).send(response);
    }).catch(next);
  }

  update(req, res, next) {
    const payload = req.body[this.resourceRoot];

    if (!payload) { return next(new this.Errors.BadRequestError()); }

    const id = req.params.id;

    this.model.findById(id).then(instance => {
      return instance.updateAttributes(payload).catch(err => {
        const message = _.first(err.errors).message;
        const UnprocessableEntityError = this.Errors.UnprocessableEntityError;

        throw new UnprocessableEntityError(message);
      });
    }).then(updatedInstance => {
      return this.formatResponse(updatedInstance);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  destroy(req, res, next) {
    const id = req.params.id;

    this.model.findById(id).then(instance => {
      if (!instance) {
        const message = `resource '${this.resourceRoot}' with id '${id}' does not exist`;

        throw new this.Errors.NotFoundError(message);
      }
      return instance.destroy();
    }).then(() => {
      res.status(204).send();
    }).catch(next);
  }

  loadModel(name) {
    const model = this.modelManager.get(name);

    this.resourceRoot = inflection.singularize(model.name.toLowerCase());
    this.pluralResourceRoot = inflection.pluralize(this.resourceRoot);
    this.model = model;

    return model;
  }

  formatResponse(record) {
    if (Array.isArray(record)) {
      return this._recordArray(record);
    }

    return this._recordObject(record);
  }

  _recordArray(records) {
    const formattedRecordArray = {};

    formattedRecordArray[this.pluralResourceRoot] = _.map(records, "dataValues");
    return formattedRecordArray;
  }

  _recordObject(record) {
    const formattedRecordObject = {};

    formattedRecordObject[this.resourceRoot] = record.dataValues;
    return formattedRecordObject;
  }
}

BaseController.prototype.Errors = RestifyErrors;

module.exports = BaseController;
