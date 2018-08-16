const express = require("express");
const moment = require("moment");
const Sequelize = require("sequelize");

const authCheck = require("../middlewares/authChecker");
const Listings = require("../db/models").listings;
const Contacts = require("../db/models").contacts;
const ListingContacts = require("../db/models").ListingContacts;

const router = express.Router();
const Op = Sequelize.Op;

// GET ALL LISTINGS FROM DB
router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listings = await Listings.findAndCountAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        [Op.and]: {
          address: {
            [Op.iLike]: `%${req.query.query}%`
          }
        }
      },
      order: [["updatedAt", "DESC"]]
    });

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

router.get("/:id/contacts", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listingContacts = await Contacts.findAndCountAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        [Op.and]: {
          fullName: {
            [Op.iLike]: `%${req.query.query}%`
          }
        }
      },
      include: [
        {
          model: Listings,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(listingContacts);
  } catch (err) {
    console.error("FETCHING LISTING CONTACTS ERROR", err);
  }
});

// BULK ADD CONTACTS TO GROUP AND RETURN GROUP-CONTACTS
router.post("/:id/contacts/add", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    await ListingContacts.bulkCreate(req.body.listingContacts);
    const listingContacts = await Contacts.findAndCountAll({
      limit: 25,
      offset: 0,
      query: "",
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Listings,
          where: {
            id: req.params.id
          }
        }
      ]
    });
    res.json(listingContacts);
  } catch (err) {
    console.error("ERROR ADDING CONTACTS TO LISTING", err);
  }
});

router.post("/:id/contact/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listing = await Listings.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await listing.removeContact(req.body.contactId);

    const listingContacts = await Contacts.findAndCountAll({
      limit: 25,
      offset: 0,
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Listings,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(listingContacts);
  } catch (err) {
    console.error("ERROR REMOVING CONTACT FROM LISTING");
  }
});

///////////////////////

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
