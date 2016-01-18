"use strict";

import BaseController from "../../../lib/controller";

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

export default PostsController;
