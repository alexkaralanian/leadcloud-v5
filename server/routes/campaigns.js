const express = require("express");
const authCheck = require("../middlewares/authChecker");
const campaigns = require("../controllers/campaigns");

const router = express.Router();

// Campaigns
router.get("/", authCheck, campaigns.getAll);
router.get("/:id", authCheck, campaigns.getOne);
router.post("/", authCheck, campaigns.create);
router.patch("/:id", authCheck, campaigns.update);
router.post("/", authCheck, campaigns.send);
router.delete("/:id");

// Campaign Listings\
router.get("/:id/listings");
router.post("/:id/listing");
router.patch("/:id/listing");
router.delete("/:id/listing");

// Campaign Groups
router.get("/:id/groups");
router.post("/:id/group");
router.patch("/:id/group");
router.delete("/:id/group");

module.exports = router;
