"use strict";

const http = require("http");

const App = require("./lib/app");

App.boot().then(app => {
  let server = http.createServer(app);

  server.listen(app.get("port"), function () {
    console.log(`Bonfire listening on 0.0.0.0:${app.get("port")}`);
  });
}).catch(console.err);
