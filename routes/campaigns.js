const express = require("express");
const authCheck = require("../middlewares/authChecker");
const Listings = require("../db/models").listings;

module.exports = router;
