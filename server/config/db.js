module.exports = {
  development: {
    host: "192.168.99.100",
    username: "postgres",
    password: "postgres",
    database: "bonfire_dev",
    dialect: "postgres",
    logging: false
  },
  test: {
    host: "192.168.99.100",
    username: "postgres",
    password: "postgres",
    database: "bonfire_test",
    dialect: "postgres"
  },
  production: {
    host: process.env.POSTGRES_PORT_5432_TCP_ADDR,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "bonfire",
    dialect: "postgres",
    seederStorage: "json"
  }
};
