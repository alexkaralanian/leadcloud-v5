const keys = require("../../config/keys");

module.exports = {
  development: {
    username: keys.DB_USERNAME,
    password: keys.DB_PASSWORD,
    database: keys.DB_NAME,
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: "postgres",
    password: null,
    database: "leadcloud_test",
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  production: {
    username: "root",
    password: null,
    database: "leadcloud_prod",
    host: "localhost",
    dialect: "postgres"
  }
};
