module.exports = {
  development: {
    username: "bonfire_dev",
    password: "postgres",
    database: "bonfire_dev",
    host: "192.168.99.100",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "bonfire_test",
    host: "192.168.99.100",
    dialect: "postgres"
  },
  production: {
    host: process.env.POSTGRES_PORT_5432_TCP_ADDR,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "bonfire",
    dialect: "postgres",
    seederStorage: "json",
    sedderStoragePath: "seeds.json"
  }
};
