"use strict";

const http = require("http");

const App = require("./server/");

function appIsReady() {
  console.log("Your fire is ready!");
}

function startServer(app) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);

    server.listen(app.get("port"), function listen(err) {
      if (err) { return reject(err); }

      console.log(`Bonfire listening on 0.0.0.0:${app.get("port")}`);

      resolve(app);
    });
  });
}

App.boot().then(app => {
  // TODO: App.log
  console.log("Gathering firewood...");
  return startServer(app);
}).then(appIsReady).catch(console.error);
