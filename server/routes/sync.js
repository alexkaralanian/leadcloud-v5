const express = require("express");
const sync = require("../controllers/sync");
const findUserById = require("../middlewares/findUserById");
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.get("/google-contacts", authCheck, findUserById, sync.googleContacts);

module.exports = router;
