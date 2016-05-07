"use strict";

const expect = require("chai").expect;
const supertest = require("supertest");

const fixtures = require("../fixtures");
const helpers = require("../helpers");
const models = require("../../lib/models");

helpers.initHelpers();

describe("Controller | Posts", function () {
  let client;

  beforeEach(function () {
    return helpers.setupForTesting().then(app => {
      client = supertest(app);
    });
  });

  afterEach(function () {
    return cleanAll();
  });

  describe("GET /posts", function () {
    it("returns an empty collection if no records exist", function (done) {
      cleanAll().then(function () {
        client.get("/api/v1/posts")
          .expect(200, {
            posts: []
          })
        .end(done);
      }).catch(done);
    });

    it("returns a list of posts", function (done) {
      client.get("/api/v1/posts")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) { return done(err); }

          let post1 = res.body.posts[0];
          expect(post1).to.have.any.key("name");
          done();
        });
    });
  });

  describe("GET /posts/:permalink", function () {
    it("returns a 404 if no record is found", function (done) {
      client.get("/api/v1/posts/1")
        .expect(404)
        .end(function (err, res) {
          if (err) { return done(err); }

          let message = res.body.message;

          expect(message).to.eql("resource 'post' with id '1' does not exist");
          done();
        });
    });

    it("returns a single post by id", function (done) {
      models.Post.findAll().then(posts => {
        client.get(`/api/v1/posts/${posts[0].id}`)
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err); }

            let post = res.body.post;

            expect(post.id).to.eql(posts[0].id);
            done();
          });
      }).catch(done);
    });

    it("returns a single post by permalink");

    it("returns a single post by slug");
  });

  describe("POST /posts", function () {
    it("creates a new post", function (done) {
      client.post("/api/v1/posts")
        .send({
          post: {
            content: "I'll never join the dark side",
            title: "something-new"
          }
        })
        .expect(201)
        .end(function (err, res) {
          if (err) { return done(err); }

          let content = res.body.post.content;

          expect(content).to.eql("I'll never join the dark side");
          done();
        });
    });

    it("returns a BadRequestError if POST body is invalid", function (done) {
      client.post("/api/v1/posts")
        .send({ content: "I'll never join the dark side", name: "something-new" })
        .expect(400)
        .end(done);
    });

    it("returns a validation error for missing title");

    it("returns a validation error for missing type");
  });

  describe("PUT /posts/:id", function () {
    it("updates a post", function (done) {
      models.Post.findAll().then(posts => {
        client.put(`/api/v1/posts/${posts[0].id}`)
          .send({ post: { content: "something other than foo" } })
          .expect(200)
          .end(function (err, res) {
            if (err) { return done(err); }

            let post = res.body.post;

            expect(post.content).to.eql("something other than foo");
            expect(post.id).to.eql(posts[0].id);
            done();
          });
      }).catch(done);
    });

    it("returns a BadRequestError if PUT body is invalid", function (done) {
      models.Post.findAll().then(posts => {
        client.put(`/api/v1/posts/${posts[0].id}`)
          .send({ content: "something other than foo" })
          .expect(400)
          .end(done);
      }).catch(done);
    });
  });

  describe("DELETE /posts/:id", function () {
    it("destroys a post", function (done) {
      models.Post.findAll().then(posts => {
        client.delete(`/api/v1/posts/${posts[0].id}`)
          .expect(204)
          .end(function (err, res) {
            if (err) { return done(err); }

            findPostById(posts[0].id).then(record => {
              expect(record).to.be.null;
              done();
            }).catch(done);
          });
      }).catch(done);
    });
  });
});
