const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session = require("cookie-session");
const helmet = require("helmet");

const db = require("./db/models");
const keys = require("./config/keys");
require("./services/passport");

const app = express();

app.use(helmet());

app.use(
  session({
    name: "session",
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    secret: keys.SESSION_SECRET
  })
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// SESSION LOGGIN MIDDLEWARE
app.use((req, res, next) => {
  console.log("session", req.session);
  next();
});

// ROUTES
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/authp", require("./routes/authp")); // passport test

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
