"use strict";

const express = require("express");
const passport = require("passport");
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
    console.log("IS AUTHED", req.isAuthenticated());
    console.log("LOGIN", { session: req.session, user: req.user });
    res.redirect("/");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  console.log("IS AUTHED", req.isAuthenticated());
  console.log("LOGOUT", { session: req.session, user: req.user });
  res.sendStatus(200);
});

router.get("/current-user", (req, res, next) => {
  console.log("USER", req.user);
  res.send(req.user);
});

module.exports = router;
