const express = require("express");
const gmail = require("../repository/google-gmail");
const authCheck = require("../middlewares/authChecker");
const findUserById = require("../middlewares/findUserById");

const router = express.Router();

router.get("/gmail", authCheck, findUserById, gmail.fetchUserEmails);
router.get("/gmail/:id", authCheck, findUserById, gmail.fetchMessage);

module.exports = router;
