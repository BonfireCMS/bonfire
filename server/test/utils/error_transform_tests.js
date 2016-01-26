"use strict";

const errors= require("restify-errors");
const expect = require("chai").expect;

const statusFromCode = require("../../lib/utils/error_transform");

describe("Util | error transform", function () {
  it("transforms a BadRequestError to 400", function () {
    let error = new errors.BadRequestError();

    expect(statusFromCode(error.body.code)).to.eql(400);
  });

  it("transforms an UnauthorizedError to 401", function () {
    let error = new errors.UnauthorizedError();

    expect(statusFromCode(error.body.code)).to.eql(401);
  });

  it("transforms a ForbiddenError to 403", function () {
    let error = new errors.ForbiddenError();

    expect(statusFromCode(error.body.code)).to.eql(403);
  });

  it("transforms a ResourceNotFoundError to 404", function () {
    let error = new errors.ResourceNotFoundError();

    expect(statusFromCode(error.body.code)).to.eql(404);
  });

  it("transforms a MethodNotAllowedError to 405", function () {
    let error = new errors.MethodNotAllowedError();

    expect(statusFromCode(error.body.code)).to.eql(405);
  });

  it("transforms a ConflictError to 409", function () {
    let error = new errors.ConflictError();

    expect(statusFromCode(error.body.code)).to.eql(409);
  });

  it("transforms a UnprocessableEntityError to 422", function () {
    let error = new errors.UnprocessableEntityError();

    expect(statusFromCode(error.body.code)).to.eql(422);
  });

  it("transforms an InternalServerError to 500", function () {
    let error = new errors.InternalServerError();

    expect(statusFromCode(error.body.code)).to.eql(500);
  });
});
