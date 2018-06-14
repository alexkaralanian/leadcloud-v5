const express = require("express");
const moment = require("moment");

const authCheck = require("../middlewares/authChecker");
const Listings = require("../db/models").listings;
const Contacts = require("../db/models").contacts;

const router = express.Router();

// GET ALL LISTINGS FROM DB
router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listings = await Listings.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        $and: {
          address: {
            $iLike: `${req.query.query}%`
          }
        }
      },
      order: [["updated", "DESC"]]
    });

    console.log("LISTINGS", listings);
    res.json(listings);
  } catch (err) {
    console.error(err);
  }
});

// Create new listing
router.post("/new", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const createdListing = await Listings.create({
      UserUuid: userId,
      address: req.body.address,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      updated: moment(Date.now()).toISOString(),
      listingContacts: []
    });

    res.json(createdListing.dataValues);
  } catch (err) {
    console.error(err);
  }
});

// Fetch single listing
router.get("/:id", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listing = await Listings.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });

    res.json(listing);
  } catch (err) {
    console.error(err);
  }
});

// Update listing
router.patch("/:id/update", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listing = await Listings.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    const updatedListing = await listing.update(req.body);
    res.json(updatedListing);
  } catch (err) {
    console.error(err);
  }
});

// Delete listing
router.delete("/:id/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listing = await Listings.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });

    await listing.destroy();
    res.json({
      message: "Listing Deleted Successfully"
    });
  } catch (err) {
    console.error(err);
  }
});

// LISTING CONTACTS

router.post("/fetchListingContacts", authCheck, async (req, res) => {
  try {
    const listing = await Listings.findById(req.body.listingId);
    const contacts = await listing.getContacts();
    res.json(contacts.map(contact => contact.dataValues));
  } catch (err) {
    console.error(err);
  }
});

router.post("/setListingContacts", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.body.contactId,
        UserUuid: userId
      }
    });
    await contact.addListing(req.body.listingId);

    const listing = await Listings.findOne({
      where: {
        id: req.body.listingId,
        UserUuid: userId
      }
    });
    await listing.addContact(req.body.contactId);

    const contacts = await listing.getContacts();
    res.json(contacts.map(contact => contact.dataValues));
  } catch (err) {
    console.error(err);
  }
});

router.post("/deleteListingContact", authCheck, async (req, res) => {
  try {
    const listing = await Listings.findById(req.body.listingId);
    await listing.removeContact(req.body.contactId);

    const contacts = await listing.getContacts();
    res.json(contacts.map(contact => contact.dataValues));
  } catch (err) {
    console.error(err);
  }
});

// LISTING IMAGES
router.post("/images", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listing = await Listings.findOne({
      where: {
        id: req.body.componentId,
        UserUuid: userId
      }
    });
    let images = listing.images;
    if (!images || images.length === 0) {
      images = req.body.images;
    } else {
      images = images.concat(req.body.images);
    }

    const updatedListing = await listing.update({
      images
    });
    res.json(updatedListing);
  } catch (err) {
    console.error(err);
  }
});

router.post("/images/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listing = await Listings.findOne({
      where: {
        UserUuid: userId,
        id: req.body.listingId
      }
    });
    const imageArray = listing.images;
    imageArray.splice(imageArray.indexOf(req.body.image), 1);

    const updatedListing = await listing.update({
      images: imageArray.length === 0 ? null : imageArray
    });
    res.json(updatedListing);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
