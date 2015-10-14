"use strict";

let config = require("../config");

module.exports[config.app.environment] = config.postgres;
