"use strict";

// TODO: add error handlers to all catch

const Controller = require("../controller");

class PostsController extends Controller {
  constructor() {
    super(...arguments);
    this.model = this.loadModel("Post");
  }

  index(req, res, next) {
    // TODO query params

    this.model.findAll().then(records => {
      return this.formatResponse(records);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  show(req, res, next) {
    let id = req.params.id;

    this.model.findById(id).then(record => {
      if (record) {
        return this.formatResponse(record);
      } else {
        throw new this.Errors.ResourceNotFoundError(`The resource ${this.model.name}:${req.params.id} does not exist`);
      }
    }).then(response => {
      res.status(200).send(response);
    }).catch(err => {
      let code = this.codeFromError(err);
      res.status(code).send(err.body);
    }).catch(next);
  }

  create(req, res, next) {
    let payload = req.body[this.resourceRoot];
    // validate things

    this.model.create(payload).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(201).send(response);
    }).catch(next);
  }

  update(req, res, next) {
    let id = req.params.id;
    let payload = req.body;
    payload[this.resourceRoot] = req.body[this.resourceRoot];

    this.model.findById(id).then(record => {
      return record.updateAttributes(payload[this.resourceRoot]);
    }).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  destroy(req, res, next) {
    let id = req.params.id;

    this.model.findById(id).then(record => {
      return record.destroy();
    }).then(() => {
      res.status(204).send();
    }).catch(next);
  }
}

module.exports = PostsController;
