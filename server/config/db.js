module.exports = {
  development: {
    username: "bonfire_dev",
    password: "postgres",
    database: "bonfire_dev",
    host: "docker.local",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "bonfire_test",
    host: "docker.local",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "bonfire",
    dialect: "postgres"
  }
};
