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
    it("creates a new post", function (done) {
      client.post("/api/v1/posts")
        .send({
          post: {
            content: "I'll never join the dark side"
          }
        })
        .expect(201)
        .end(function (err, res) {
          if (err) { return done(err); }

          let { content } = res.body.post;

          expect(content).to.eql("I'll never join the dark side");
          done();
        });
    });

    it("returns a validation error for missing title");

    it("returns a validation error for missing type");
  });

  describe("PUT /posts/:id", function () {
    it("updates a post", function (done) {
      createPost(fixtures.post1).then(post => {
        expect(post.content).to.eql("foo");

        client.put(`/api/v1/posts/${post.id}`)
          .send({
            post: {
              content: "something other than foo"
            }
          })
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err); }

            let { content } = res.body.post;

            expect(content).to.eql("something other than foo");
            done();
          });
      }).catch(done);
    });
  });

  describe("DELETE /posts/:id", function () {
    it("destroys a post", function (done) {
      createPost(fixtures.post1).then(post => {
        client.delete(`/api/v1/posts/${post.id}`)
          .expect(204)
          .end(function (err, res) {
            if (err) { return done(err); }

            findPostById(post.id).then(record => {
              expect(record).to.be.null;
              done();
            }).catch(done);
          });
      }).catch(done);
    });
  });
});
