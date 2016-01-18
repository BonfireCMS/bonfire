"use strict";

import path from "path";

import { expect } from "chai";
import express from "express";
import supertest from "supertest";
import bodyParser from "body-parser";

import Controller from "../lib/controller";
import Models from "../lib/models";

describe("Controller", function () {
  let controller;

  beforeEach(function () {
    controller = new Controller();
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
        id: 1,
        name: "Luke Skywalker"
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
        id: 1,
        name: "Luke Skywalker"
      }, {
        id: 2,
        name: "Leia Organa"
      }];

      let formattedRecords = controller.formatResponse(records);
      expect(formattedRecords).to.eql({
        users: records
      });
    });
  });
});
