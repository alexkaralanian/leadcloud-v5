const express = require("express");
const authCheck = require("../middlewares/authChecker");
const campaigns = require("../controllers/campaigns");

const router = express.Router();

// Campaigns
router.get("/", authCheck, campaigns.getAll);
router.get("/:id", authCheck, campaigns.getOne);
router.post("/", authCheck, campaigns.create);
router.patch("/:id", authCheck, campaigns.update);
router.delete("/:id");
router.post("/send", authCheck, campaigns.send);

module.exports = router;
