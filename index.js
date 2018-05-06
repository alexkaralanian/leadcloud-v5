const keys = require("./config/keys");
console.log("NODE_ENV=" + process.env.NODE_ENV);

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
// const passport = require("passport");
// const session = require("cookie-session");
const redis = require("redis");

const redisClient = redis.createClient({
  // host: keys.REDIS_URI,
  // port: 6379,
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

const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const db = require("./db/models");

// require("./services/passport");

const app = express();

app.use(helmet());

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("error", err => {
  console.log("Error in Redis", err);
});

// REDIS SESSION
app.use(
  session({
    store: new RedisStore({
      client: redisClient
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/email", require("./routes/email"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Error");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
