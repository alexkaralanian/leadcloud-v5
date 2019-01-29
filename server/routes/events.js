const express = require("express");
const events = require("../controllers/events");
// const groupsContacts = require("../controllers/group-contacts");

const authCheck = require("../middlewares/authChecker");

const router = express.Router();

// EVENTS
router.get("/", authCheck, events.getAll);
router.post("/", authCheck, events.create);
router.get("/:id", authCheck, events.getOne);
router.patch("/:id", authCheck, events.update);
router.delete("/:id/delete", authCheck, events.delete);

module.exports = router;
