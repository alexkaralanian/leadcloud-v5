const express = require("express");
const authCheck = require("../middlewares/authChecker");
const campaigns = require("../controllers/campaigns");

const router = express.Router();

router.post("/", authCheck, campaigns.create);
router.put("/", authCheck, campaigns.submit);
router.patch("/:id", authCheck, campaigns.update);
router.get("/", authCheck, campaigns.getAll);
router.get("/:id", authCheck, campaigns.getOne);

module.exports = router;
