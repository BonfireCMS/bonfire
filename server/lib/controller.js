"use strict";

const inflection = require("inflection");
const RestifyErrors = require("restify-errors");

const Models = require("./models");

const ERROR_MAP = {
  ResourceNotFound: 404
};

class BaseController {
  constructor() {
    this.modelManager = new Map();

    Object.keys(Models).forEach(model => {
      this.modelManager.set(model, Models[model]);
    });
  }

  codeFromError(err) {
    return ERROR_MAP[err.restCode];
  }

  loadModel(name) {
    this.resourceRoot = inflection.singularize(name.toLowerCase());
    this.pluralResourceRoot = inflection.pluralize(name.toLowerCase());
    return this.modelManager.get(name);
  }

  formatResponse(record) {
    if (Array.isArray(record)) {
      return this._recordArray(record);
    }

    return this._recordObject(record);
  }

  _recordArray(records) {
    const formattedRecordArray = {};

    formattedRecordArray[this.pluralResourceRoot] = records;
    return formattedRecordArray;
  }

  _recordObject(record) {
    const formattedRecordObject = {};

    formattedRecordObject[this.resourceRoot] = record;
    return formattedRecordObject;
  }
}

BaseController.prototype.Errors = RestifyErrors;

module.exports = BaseController;
