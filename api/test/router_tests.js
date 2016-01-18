"use strict";

import path from "path";

import { expect } from "chai";
import express from "express";
import supertest from "supertest";
import bodyParser from "body-parser";

import Router from "../lib/router";

describe("Router", function () {
  let app, client, router;

  beforeEach(function () {
    router = new Router({
      controllersPath: path.resolve(__dirname, "fixtures/controllers")
    });
    router.getRouter().get("/", function () {});
    app = express();
    app.use(bodyParser.json());
    client = supertest(app);
  });

  describe("map", function () {
    it("returns an instance of Router", function () {
      let router = Router.map(function () {
      });

      expect(router).to.be.an.instanceof(Router);
    });
  });

  describe("#route", function () {
    it("maps a static route to its controller", function (done) {
      router.route("/about", { with: "foo:about", using: "get" });
      app.use(router.api, router.getRouter());

      client.get("/api/v1/about")
        .expect(200, "showing about")
        .end(done);
    });
  });

  describe("#resource", function () {
    beforeEach(function () {
      router.resource("users");
      app.use(router.api, router.getRouter());
    });

    it("maps a route to a an index action", function (done) {
      client.get("/api/v1/users")
        .expect(200, { users: [{ id: 1 }] })
        .end(done);
    });

    it("maps a route to a show action", function (done) {
      client.get("/api/v1/users/1")
        .expect(200, { user: { id: 1 }})
        .end(done);
    });

    it("maps a route to a create action", function (done) {
      client.post("/api/v1/users")
        .send({
          user: { name: "foo" }
        })
        .expect(201, { user: { name: "foo" }})
        .end(done);
    });

    it("maps a route to an update action", function (done) {
      client.put("/api/v1/users/1")
        .send({
          user: { name: "bar" }
        })
        .expect(200, { user: { id: 1, name: "bar" }})
        .end(done);
    });

    it("maps a route to destroy action", function (done) {
      client.delete("/api/v1/users/1")
        .expect(204)
        .expect("Location", "http://localhost:3000/api/v1/users")
        .end(done);
    });

    it("route paths can be configured", function (done) {
      router.resource("posts", { path: "/blog-posts" });

      client.get("/api/v1/blog-posts")
        .expect(200, { posts: [{ id: 1 }] }, done);
    });
  });

  describe("#namespace", function () {
    it("namespaces nested routes");

    it("namespaces nested resources");
  });
});
