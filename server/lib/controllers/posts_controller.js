"use strict";

// TODO: add error handlers to all catch

const errors = require("restify-errors");

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
    const id = req.params.id;

    this.model.findById(id).then(record => {
      if (!record) {
        throw new this.Errors.ResourceNotFoundError(
            `The resource ${this.model.name}:${req.params.id} does not exist`
        );
      }

      return this.formatResponse(record);
    }).then(response => {
      res.status(200).send(response);
    }).catch(err => {
      const code = this.codeFromError(err);

      res.status(code).send(err.body);
    });
  }

  create(req, res, next) {
    const payload = req.body[this.resourceRoot];

    if (!payload) {
      return next(new errors.BadRequestError());
    }
    // validate things

    this.model.create(payload).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(201).send(response);
    }).catch(next);
  }

  update(req, res, next) {
    const id = req.params.id;
    const payload = req.body[this.resourceRoot];

    if (!payload) {
      return next(new errors.BadRequestError());
    }

    this.model.findById(id).then(record => {
      return record.updateAttributes(payload);
    }).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  destroy(req, res, next) {
    const id = req.params.id;

    this.model.findById(id).then(record => {
      return record.destroy();
    }).then(() => {
      res.status(204).send();
    }).catch(next);
  }
}

module.exports = PostsController;
