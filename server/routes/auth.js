const express = require("express");
const auth = require("../controllers/auth");
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.get("/google", auth.login);
router.get("/google/callback", auth.googleCallback);
router.get("/current-user", authCheck, auth.getCurrentUser);
router.get("/logout", auth.logout);

module.exports = router;
