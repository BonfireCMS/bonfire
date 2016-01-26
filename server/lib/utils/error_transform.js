"use strict";

module.exports = function (restCode) {
  return ERROR_CODE_MAP[restCode];
};

const ERROR_CODE_MAP = {
  BadRequestError: 400,
  ConflictError: 409,
  ForbiddenError: 403,
  InternalServerError: 500,
  MethodNotAllowedError: 405,
  ResourceNotFound: 404,
  UnauthorizedError: 401,
  UnprocessableEntityError: 422
};
