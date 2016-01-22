"use strict";

const App = require("./lib/app");
const Router = require("./lib/router");

let app = new App();

app.boot(function () {
  console.log(app.app.get("port"));
});
