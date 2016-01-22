"use strict";

const BaseController = require("../../../lib/controller");

class FooController extends BaseController {
  constructor() {
    super();
  }

  about(req, res, next) {
    res.send("showing about");
    next();
  }
}

module.exports = FooController;
