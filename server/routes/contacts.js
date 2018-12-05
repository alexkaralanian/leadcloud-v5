const express = require("express");

const authCheck = require("../middlewares/authChecker");
const contactsController = require("../controllers/contacts");
const contactListingsController = require("../controllers/contact-listings");
const contactGroupsController = require("../controllers/contact-groups");
const contactImagesController = require("../controllers/contact-images");

const router = express.Router();

// CONTACTS
router.get("/", authCheck, contactsController.getContacts);
router.get("/:id", authCheck, contactsController.getContact);
router.post("/", authCheck, contactsController.createContact);
router.patch("/:id", authCheck, contactsController.updateContact);
router.delete("/:id", authCheck, contactsController.deleteContact);

// CONTACT LISTINGS
router.get("/:id/listings", authCheck, contactListingsController.getContactListings);
router.post("/:id/listings", authCheck, contactListingsController.addContactListings);
router.delete("/:id/listing", authCheck, contactListingsController.removeContactListing);

// CONTACT GROUPS
router.get("/:id/groups", authCheck, contactGroupsController.getContactGroups);
router.post("/:id/groups", authCheck, contactGroupsController.addContactGroups);
router.delete("/:id/group", authCheck, contactGroupsController.removeContactGroup);

// CONTACT IMAGES
router.post("/images", authCheck, contactImagesController.addContactImage);
router.delete("/:id/image", authCheck, contactImagesController.deleteContactImage);

module.exports = router;
