const express = require("express");
const groups = require("../controllers/groups");
const groupsContacts = require("../controllers/group-contacts");

const authCheck = require("../middlewares/authChecker");

const router = express.Router();

// GROUPS
router.get("/", authCheck, groups.getAll);
router.get("/:id", authCheck, groups.getOne);
router.post("/", authCheck, groups.create);
router.patch("/:id", authCheck, groups.update);
router.delete("/:id/delete", authCheck, groups.delete);

// GROUP CONTACTS
router.get("/:id/contacts", authCheck, groupsContacts.getAll);
router.post("/:id/contacts", authCheck, groupsContacts.create);
router.delete("/:id/contact", authCheck, groupsContacts.delete);

module.exports = router;
