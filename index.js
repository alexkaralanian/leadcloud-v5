const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const passport = require("passport");
// const session = require("cookie-session");

const redis = require("redis");
const redisClient = redis.createClient({ host: "localhost", port: 6379 });
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const db = require("./db/models");
const keys = require("./config/keys");
require("./services/passport");

const app = express();

app.use(helmet());

redisClient.on("ready", function() {
  console.log("Redis is ready");
});

redisClient.on("error", function() {
  console.log("Error in Redis");
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

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const authCheck = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("NOT AUTHENTICATED");
  res.redirect("/");
};

// TESTING EXAMPLE
app.get("/test", (req, res) => {
  res.send({
    message: "Hello, world!"
  });
});

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/email", require("./routes/email"));

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
