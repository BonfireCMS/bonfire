"use strict";

const http = require("http");

const App = require("./lib/app");
const models = require("./lib/models");
const Post = models.Post;
const Setting = models.Setting;

App.boot().then(app => {
  // TODO: App.log
  console.log("Gathering firewood...");
  return startServer(app);
}).then(appIsReady).catch(console.error);

function appIsReady() {
  console.log("Your fire is ready!");
}

function startServer(app) {
  return new Promise((resolve, reject) => {
    let server = http.createServer(app);

    server.listen(app.get("port"), function (err) {
      if (err) { return reject(err); }

      console.log(`Bonfire listening on 0.0.0.0:${app.get("port")}`);

      resolve(app);
    });
  });
}
