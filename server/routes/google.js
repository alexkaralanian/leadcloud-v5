const express = require("express");
const googleController = require("../controllers/google");
const findUserById = require("../middlewares/findUserById");
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.get("/sync-contacts", authCheck, findUserById, googleController.syncContacts);

module.exports = router;
