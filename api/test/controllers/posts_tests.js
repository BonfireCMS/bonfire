"use strict";

import { expect } from "chai";
import supertest from "supertest";

import fixtures from "../fixtures";
import { initHelpers, startApp } from "../helpers";
initHelpers();

describe("Controller | Posts", function () {
  let app, client;

  beforeEach(function () {
    app = startApp();
    client = supertest(app.getApp());
  });

  afterEach(function () {
    return cleanAll();
  });

  describe("GET /posts", function () {
    it("returns an empty collection if no records exist", function (done) {
      client.get("/api/v1/posts")
        .expect(200, {
          posts: []
        })
        .end(done);
    });

    it("returns a list of posts", function (done) {
      createPost(fixtures.post1).then(post => {
        client.get("/api/v1/posts")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err); }

            let [post1] = res.body.posts;
            expect(post1.content).to.eql("foo");
            done();
          });
      }).catch(done);
    });
  });

  describe("GET /posts/:permalink", function () {
    it("returns a 404 if no record is found", function (done) {
      client.get("/api/v1/posts/1")
        .expect(404)
        .end(function (err, res) {
          if (err) { return done(err); }

          let { message } = res.body;

          expect(message).to.eql("The resource Post:1 does not exist");
          done();
        });
    });

    it("returns a single post by id", function (done) {
      createPost(fixtures.post1).then(post => {
        client.get(`/api/v1/posts/${post.id}`)
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err); }

            let { id, content } = res.body.post;

            expect(id).to.eql(post.id);
            expect(content).to.eql("foo");
            done();
          });
      }).catch(done)
    });

    it("returns a single post by permalink");

    it("returns a single post by slug");
  });

  describe("POST /posts", function () {
    it("creates a new post");
  });
});
