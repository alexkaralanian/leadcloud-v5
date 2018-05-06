const keys = require("../../config/keys");

module.exports = {
  development: {
    username: keys.DB_USERNAME,
    password: keys.DB_PASSWORD,
    database: keys.DB_NAME,
    host: keys.DB_HOST,
    dialect: "postgres",
    logging: false,
    retry: {
      max: 100
    }
  },
  production: {
    username: keys.DB_USERNAME,
    password: keys.DB_PASSWORD,
    database: keys.DB_NAME,
    host: keys.DB_HOST,
    dialect: "postgres",
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
