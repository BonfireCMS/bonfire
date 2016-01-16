"use strict";

import BaseController from "../../../lib/controller";

class UsersController extends BaseController {
  constructor() {
    super();
    this.model = [{
      id: 1
    }];
  }

  create(req, res, next) {
    let newUser = req.body.user;
    res.status(201).send({
      user: newUser
    });
    next();
  }

  destroy(req, res, next) {
    res.header("Location", "http://localhost:3000/api/v1/users")
      .status(204)
      .send();
    next();
  }

  index(req, res, next) {
    res.send({
      users: this.model
    });
    next();
  }

  show(req, res, next) {
    res.send({
      user: this.model[0]
    });
    next();
  }

  update(req, res, next) {
    let user = this.model[0];
    let body = req.body.user;

    Object.keys(body).forEach(prop => user[prop] = body[prop]);
    res.status(200).send({ user: user });
    next();
  }
}

export default UsersController;
