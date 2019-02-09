console.log("NODE_ENV=" + process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const keys = require("./config/keys");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const redisClient = require("./services/redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const cors = require("cors");

const app = express();

app.use(cors());
app.use(helmet());

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

app.use("/api/upload", require("./routes/upload"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/email", require("./routes/email"));
app.use("/api/sync", require("./routes/sync"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/listings", require("./routes/listings"));
app.use("/api/groups", require("./routes/groups"));
app.use("/api/events", require("./routes/events"));
app.use("/api/campaigns", require("./routes/campaigns"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Error");
  next();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
