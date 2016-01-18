"use strict";

import Controller from "../controller";

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
    let { id } = req.params;

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
    });
  }

  create(req, res, next) {
    // validate things
    let { [this.resourceRoot]: payload } = req.body;

    this.model.create(payload).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(201).send(response);
    }).catch(next);
  }

  update(req, res, next) {
    let { id } = req.params;
    let { post } = req.body;

    this.model.findById(id).then(record => {
      return record.updateAttributes(post);
    }).then(record => {
      return this.formatResponse(record);
    }).then(response => {
      res.status(200).send(response);
    }).catch(next);
  }

  destroy(req, res, next) {
    let { id } = req.params;

    this.model.findById(id).then(record => {
      return record.destroy();
    }).then(() => {
      res.status(204).send();
    }).catch(next);
  }
}

export default PostsController;
