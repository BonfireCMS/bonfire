module.exports = {
  development: {
    "username": "bonfire_dev",
    "password": "postgres",
    "database": "bonfire_dev",
    "host": "192.168.99.100",
    "dialect": "postgres",
    "logging": false
  },
  test: {
    "username": "postgres",
    "password": "postgres",
    "database": "bonfire_test",
    "host": "192.168.99.100",
    "dialect": "postgres"
  },
  production: {
    "username": "postgres",
    "password": "postgres",
    "database": "bonfire",
    "host": "192.168.99.100",
    "dialect": "postgres"
  }
}
