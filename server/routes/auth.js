const express = require("express");
const authController = require("../controllers/auth");
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

// GOOGLE LOGIN
router.get("/google", authController.login);

// GOOGLE CALLBACK
router.get("/google/callback", authController.googleCallback);

// GET CURRENT USER
router.get("/current-user", authCheck, authController.getCurrentUser);

// LOGOUT
router.get("/logout", authController.logout);

module.exports = router;
