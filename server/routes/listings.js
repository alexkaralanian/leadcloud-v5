const express = require("express");
const listings = require("../controllers/listings");
const listingContacts = require("../controllers/listing-contacts");
const listingImages = require("../controllers/listing-images");
const listingOpenHouse = require("../controllers/listing-open-house");
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

// GET ALL LISTINGS FROM DB
router.get("/", authCheck, listings.getAll);
router.get("/:id", authCheck, listings.getOne);
router.post("/", authCheck, listings.create);
router.patch("/:id", authCheck, listings.update);
router.delete("/:id", authCheck, listings.delete);

// LISTING CONTACTS
router.get("/:id/contacts", authCheck, listingContacts.getAll);
router.post("/:id/contacts", authCheck, listingContacts.add);
router.post("/:id/contact/delete", authCheck, listingContacts.remove);

// LISTING IMAGES
router.post("/:id/images", authCheck, listingImages.add);
router.delete("/:id/images", authCheck, listingImages.remove);

// LAUNCH OPEN HOUSE FORM AND CREATE CONTACTS
router.post("/:id/open-house", authCheck, listingOpenHouse.create);

module.exports = router;
