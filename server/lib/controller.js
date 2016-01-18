"use strict";

import inflection from "inflection";
import RestifyErrors from "restify-errors";

import Models from "./models";

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
    } else {
      return this._recordObject(record);
    }
  }

  _recordArray(records) {
    let formattedRecordArray = {};

    formattedRecordArray[this.pluralResourceRoot] = records;
    return formattedRecordArray;
  }

  _recordObject(record) {
    let formattedRecordObject = {};

    formattedRecordObject[this.resourceRoot] = record;
    return formattedRecordObject;
  }
}

BaseController.prototype.Errors = RestifyErrors;

const ERROR_MAP = {
  ResourceNotFound: 404
};

export default BaseController;
