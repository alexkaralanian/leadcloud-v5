const keys = require("../../config/keys");

module.exports = {
  development: {
    username: keys.DB_USERNAME,
    password: keys.DB_PASSWORD,
    database: keys.DB_NAME,
    host: keys.DB_HOST,
    logging: false,
    dialect: "postgres",
    retry: {
      max: 10
    }
  },
  production: {
    username: keys.DB_USERNAME,
    password: keys.DB_PASSWORD,
    database: keys.DB_NAME,
    host: keys.DB_HOST,
    dialect: "postgres",
    logging: true,
    retry: {
      max: 100
    }
  },
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000
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
