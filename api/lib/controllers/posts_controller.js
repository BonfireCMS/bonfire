"use strict";

import Controller from "../controller";

class PostsController extends Controller {
  constructor() {
    super(...arguments);
    this.model = this.loadModel("Post");
  }

  create() {
  }

  destroy() {
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
    this.model.findById(req.params.id).then(record => {
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

  update() {
  }
}

export default PostsController;
