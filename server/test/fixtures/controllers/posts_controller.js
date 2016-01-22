"use strict";

const BaseController = require("../../../lib/controller");

class PostsController extends BaseController {
  constructor() {
    super();
    this.model = [{
      id: 1
    }];
  }

  create() {
  }

  destroy() {
  }

  index(req, res, next) {
    res.status(200).send({ posts: this.model });
    next();
  }

  show() {
  }

  update() {
  }
}

module.exports = PostsController;
