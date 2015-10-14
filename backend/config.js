"use strict";

let env = process.env

module.exports = {
  app: {
    enviroment: env.NODE_ENV || "development",
    port: env.PORT
  },
  postgres: {
    host: env.POSTGRES_PORT_5432_TCP_ADDR,
    port: env.POSTGRES_PORT_5432_TCP_PORT,
    database: env.POSTGRES_DATABASE,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    dialect: "postgres",
    logging: false
  },
  redis: {
    host: env.REDIS_PORT_6379_TCP_ADDR,
    port: env.REDIS_PORT_6379_TCP_PORT
  }
};
