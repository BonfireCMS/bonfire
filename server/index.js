"use strict";

const http = require("http");

const App = require("./lib/app");
const models = require("./lib/models");
const Post = models.Post;
const Setting = models.Setting;

App.boot().then(app => {
  return startServer(app);
}).then(app => {
  return runSetup();
}).catch(console.error);

function runSetup() {
  return Post.create({ name: "your-first-post", type: "page" }).then(post => {
    return Setting.create({ key: "blogPage", value: post.id });
  }).then(function () {
    return Setting.create({ key: "activeTheme", value: "cinder" });
  }).then(function () {
    console.log("Your fire is ready!");
  });
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
