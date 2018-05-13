const redis = require("redis");
const keys = require("../config/keys");

const redisClient = redis.createClient({
  url: keys.REDIS_URI,
  // host: keys.REDIS_HOST,
  // port: keys.REDIS_PORT,
  logErrors: true,
  retry_strategy: options => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      console.error("Redis - Connetion retry timeout");
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("error", err => {
  console.log("Error in Redis", err);
});

module.exports = redisClient;
