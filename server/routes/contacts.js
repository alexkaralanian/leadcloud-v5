const express = require("express");

const authCheck = require("../middlewares/authChecker");
const contacts = require("../controllers/contacts");
const contactListings = require("../controllers/contact-listings");
const contactGroups = require("../controllers/contact-groups");
const contactImages = require("../controllers/contact-images");

const router = express.Router();

// CONTACTS
router.get("/", authCheck, contacts.getAll);
router.get("/:id", authCheck, contacts.getOne);
router.post("/", authCheck, contacts.create);
router.patch("/:id", authCheck, contacts.update);
router.delete("/:id", authCheck, contacts.delete);

// CONTACT LISTINGS
router.get("/:id/listings", authCheck, contactListings.getAll);
router.post("/:id/listings", authCheck, contactListings.add);
router.delete("/:id/listing", authCheck, contactListings.remove);

// CONTACT GROUPS
router.get("/:id/groups", authCheck, contactGroups.getAll);
router.post("/:id/groups", authCheck, contactGroups.add);
router.delete("/:id/group", authCheck, contactGroups.remove);

// CONTACT IMAGES
router.post("/images", authCheck, contactImages.create);
router.delete("/:id/image", authCheck, contactImages.delete);

module.exports = router;
