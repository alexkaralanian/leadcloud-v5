const keys = require("../../config/keys");

module.exports = {
  development: {
    username: keys.POSTGRES_USER,
    password: keys.POSTGRES_PASSWORD,
    database: keys.POSTGRES_DB,
    host: "localhost",
    dialect: "postgres",
    logging: false,
    force: true,
    retry: {
      max: 100
    }
  },
  production: {
    username: keys.POSTGRES_USER,
    password: keys.POSTGRES_PASSWORD,
    database: keys.POSTGRES_DB,
    host: "postgres",
    dialect: "postgres",
    logging: false,
    retry: {
      max: 100
    }
  },
  test: {
    username: "postgres",
    password: null,
    database: "leadcloud_test",
    host: "localhost",
    dialect: "postgres",
    logging: false
  }
};
