require("dotenv").config();
const keys = require("./config/keys");
console.log("NODE_ENV=" + process.env.NODE_ENV);

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const redisClient = require("./services/redisClient");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const app = express();

app.use(helmet());

// REDIS SESSION
app.use(
  session({
    store: new RedisStore({
      client: redisClient
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false }, // 30 days
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/email", require("./routes/email"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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
