"use strict";

const BaseController = require("../controller");

class SettingsController extends BaseController {
  constructor() {
    super(...arguments);
    this.model = this.loadModel("Setting");
  }
}

module.exports = SettingsController;
