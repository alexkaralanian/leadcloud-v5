"use strict";

const express = require("express");
const Contacts = require("../db/models").contacts;
const Users = require("../db/models").users;

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("HELLO");
});

router.post("/new", (req, res, next) => {
  Users.create({
    email: req.body.email
  }).then(createdUser => {
    res.json(createdUser.dataValues);
  });
});

module.exports = router;
