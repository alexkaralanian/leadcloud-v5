"use strict";

const express = require("express");
const passport = require("passport");
// const { google } = require("googleapis");
const User = require("../db/models").users;

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get("/current-user", (req, res, next) => {
  console.log("USER", req.user);
  res.send(req.user);
});

module.exports = router;
