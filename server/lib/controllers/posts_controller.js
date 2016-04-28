"use strict";

const BaseController = require("../controller");

class PostsController extends BaseController {
  constructor() {
    super(...arguments);
    this.model = this.loadModel("Post");
  }
}

module.exports = PostsController;
