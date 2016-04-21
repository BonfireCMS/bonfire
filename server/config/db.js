module.exports = {
  development: {
    username: "bonfire_dev",
    password: "postgres",
    database: "bonfire_dev",
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "bonfire_test",
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "bonfire",
    dialect: "postgres"
  }
};
