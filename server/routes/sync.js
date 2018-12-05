const express = require("express");
const syncController = require("../controllers/sync");
const findUserById = require("../middlewares/findUserById");
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.get("/google-contacts", authCheck, findUserById, syncController.syncGoogleContacts);

module.exports = router;
