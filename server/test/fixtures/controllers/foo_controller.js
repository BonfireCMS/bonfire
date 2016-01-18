"use strict";

import BaseController from "../../../lib/controller";

class FooController extends BaseController {
  constructor() {
    super();
  }

  about(req, res, next) {
    res.send("showing about");
    next();
  }
}

export default FooController;
