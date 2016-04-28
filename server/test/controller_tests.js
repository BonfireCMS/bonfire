"use strict";

const path = require("path");

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const Controller = require("../lib/controller");
const Models = require("../lib/models");
const helpers = require("./helpers");

function bail(done) {
  return function (err) {
    return done(err);
  }
}

describe("Controller", function () {
  let controller, req, res;

  beforeEach(function () {
    controller = new Controller();
  });

  describe("routing", function () {
    beforeEach(function () {
      controller.loadModel("Post");

      req = { params: {}, query: {} };
      res = {
        status() {
          return this;
        }
      };

      sinon.spy(res, "status");

      return helpers.setupForTesting();
    });

    afterEach(function () {
      return helpers.cleanAll();
    });

    describe("#index", function() {
      it("returns all instances of Model", function (done) {
        res.send = function (body) {
          expect(res.status).to.have.been.calledWith(200);
          expect(body.posts).to.have.length(2);
          expect(body.posts[0]).to.have.any.keys(["name", "type", "status"])
          done();
        };

        controller.index(req, res, bail(done));
      });

      it("retuns an empty set if no instances exist", function (done) {
        helpers.cleanAll().then(() => {
          res.send = function (body) {
            expect(res.status).to.have.been.calledWith(200);
            expect(body.posts).to.have.length(0);
            done();
          };

          controller.index(req, res, bail(done));
        }).catch(done);
      });

      it("allows for querying", function (done) {
        req.query.name = "bar";

        res.send = function (body) {
          expect(res.status).to.have.been.calledWith(200);
          expect(body.posts).to.have.length(1);
          expect(body.posts[0].name).to.eql("bar");
          done();
        };

        controller.index(req, res, bail(done));
      });

      it("includes associations as a an array of ids");
    });

    describe("#show", function () {
      let post;

      beforeEach(function () {
        return helpers.createPost({
          name: "foo",
          type: "post",
          status: "published"
        }).then(created => {
          post = created;
        });
      });

      it("returns a single Model instance", function (done) {
        req.params.id = post.id;
        res.send = function (body) {
          expect(res.status).to.have.been.calledWith(200);
          expect(body.post.name).to.eql("foo");
          done();
        };

        controller.show(req, res, bail(done));
      });

      it("returns NotFoundError if instance doesn't exist", function (done) {
        helpers.cleanAll().then(() => {
          req.params.id = 1;

          controller.show(req, res, function (err) {
            expect(err.body.code).to.eql("NotFoundError");
            expect(err.body.message).to.eql("resource 'post' with id '1' does not exist");
            expect(err.statusCode).to.eql(404);
            done();
          });
        }).catch(done);
      });

      it("includes associations as a an array of ids");
    });

    describe("#create", function () {
      beforeEach(function () {
        return helpers.cleanAll();
      });

      it("creates a new Model instance", function (done) {
        req.body = {
          post: {
            name: "bar",
            type: "post",
            status: "published"
          }
        };
        res.send = function (body) {
          expect(res.status).to.have.been.calledWith(201);
          expect(body.post.name).to.eql("bar");
          done();
        };

        controller.create(req, res, bail(done));
      });

      it("returns BadRequestError if request body is invalid", function (done) {
        req.body = {
          name: "bar",
          type: "post",
          status: "published"
        };

        controller.create(req, res, function (err) {
          expect(err.body.code).to.eql("BadRequestError");
          expect(err.statusCode).to.eql(400);
          done();
        });
      });

      it("returns ValidationError for invalid data", function (done) {
        req.body = {
          post: {
            name: "foo",
            type: "post",
            status: "published"
          }
        };

        helpers.createPost({
          name: "foo",
          type: "post",
          status: "published"
        }).then(() => {

          controller.create(req, res, function (err) {
            expect(err.body.code).to.eql("UnprocessableEntityError");
            expect(err.body.message).to.eql("resource 'post' with name 'foo' already exists");
            expect(err.statusCode).to.eql(422);
            done();
          });
        }).catch(done);
      });

      it("includes associations as a an array of ids");
    });

    describe("#update", function () {
      let post;

      beforeEach(function () {
        return helpers.createPost({
          name: "foo",
          type: "post",
          status: "published"
        }).then(created => {
          post = created;
        });
      });

      it("updates an existing Model instance", function (done) {
        req.params.id = post.id;
        req.body = {
          post: {
            status: "draft"
          }
        };

        res.send = function (body) {
          expect(body.post.status).to.eql("draft");
          done();
        };

        controller.update(req, res, bail(done));
      });

      it("returns BadRequestError if request body is invalid", function (done) {
        req.params.id = post.id;
        req.body = {
          status: "draft"
        };

        controller.update(req, res, function (err) {
          expect(err.body.code).to.eql("BadRequestError");
          expect(err.statusCode).to.eql(400);
          done();
        });
      });

      it("returns ValidationError for invalid data", function (done) {
        req.params.id = post.id;
        req.body = {
          post: {
            name: "bar"
          }
        };

        controller.update(req, res, function (err) {
          expect(err.body.code).to.eql("UnprocessableEntityError");
          expect(err.body.message).to.eql("resource 'post' with name 'bar' already exists");
          expect(err.statusCode).to.eql(422);
          done();
        });
      });

      it("includes associations as a an array of ids");
    });

    describe("#destroy", function () {
      let post;

      beforeEach(function () {
        return helpers.createPost({
          name: "foo",
          type: "post",
          status: "published"
        }).then(created => {
          post = created;
        });
      });

      it("destroys a Model instance", function (done) {
        req.params.id = post.id;
        res.send = function () {
          expect(res.status).to.have.been.calledWith(204);

          helpers.findPostById(post.id).then(deleted => {
            expect(deleted).to.be.null;
            done();
          }).catch(done);
        };

        controller.destroy(req, res, bail(done));
      });

      it("returns a NotFoundError if the instance doesn't exist", function (done) {
        helpers.cleanAll().then(() => {
          req.params.id = 1;

          controller.destroy(req, res, function (err) {
            expect(err.body.code).to.eql("NotFoundError");
            expect(err.body.message).to.eql("resource 'post' with id '1' does not exist");
            expect(err.statusCode).to.eql(404);
            done();
          });
        });
      });
    });
  });

  describe("#loadModel", function () {
    it("loads a model by name", function () {
      let Model = controller.loadModel("Post");
      expect(Model).to.eql(Models.Post);
    });

    it("sets a resourceRoot", function () {
      controller.model = controller.loadModel("User");
      expect(controller.resourceRoot).to.eql("user");
    });

    it("sets a pluralResourceRoot", function () {
      controller.model = controller.loadModel("User");
      expect(controller.pluralResourceRoot).to.eql("users");
    });
  });

  describe("#codeFromError", function () {
    it("returns a 404 for ResourceNotFoundError", function () {
      let error = new controller.Errors.ResourceNotFoundError();

      expect(controller.codeFromError(error)).to.eql(404);
    });
  });

  describe("#formatResponse", function () {
    beforeEach(function () {
      controller.model = controller.loadModel("User");
    });

    it("returns a single record with a singular root", function () {
      let record = {
        dataValues: {
          id: 1,
          name: "Luke Skywalker"
        }
      };

      let formattedResponse = controller.formatResponse(record);
      expect(formattedResponse).to.eql({
        user: {
          id: 1,
          name: "Luke Skywalker"
        }
      });
    });

    it("returns a collection with a plural root", function () {
      let records = [{
        dataValues: {
          id: 1,
          name: "Luke Skywalker"
        }
      }, {
        dataValues: {
          id: 2,
          name: "Leia Organa"
        }
      }];

      let formattedRecords = controller.formatResponse(records);
      expect(formattedRecords).to.eql({
        users: [{
          id: 1,
          name: "Luke Skywalker"
        }, {
          id: 2,
          name: "Leia Organa"
        }]
      });
    });
  });
});
