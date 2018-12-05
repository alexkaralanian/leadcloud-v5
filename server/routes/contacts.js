const express = require("express");
const moment = require("moment");
const Sequelize = require("sequelize");
const isEmpty = require("lodash.isempty");

const Contacts = require("../db/models").contacts;
const Listings = require("../db/models").listings;
const Groups = require("../db/models").groups;
const ListingContacts = require("../db/models").ListingContacts;
const ContactGroups = require("../db/models").ContactGroups;

const authCheck = require("../middlewares/authChecker");

const router = express.Router();
const Op = Sequelize.Op;

router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    let contacts;
    if (req.query.query) {
      contacts = await Contacts.findAndCountAll({
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
        order: [["updatedAt", "DESC"]]
      });
    } else {
      contacts = await Contacts.findAndCountAll({
        limit: req.query.limit,
        offset: req.query.offset,
        where: {
          UserUuid: userId
        },
        order: [["updatedAt", "DESC"]]
      });
    }
    res.json(contacts);
  } catch (err) {
    console.error("FETCHING CONTACTS ERROR", err);
  }
});

router.get("/:id", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    const groups = await contact.getGroups({
      order: [["title", "ASC"]]
    });
    const contactGroups = groups.map(group => {
      if (group !== null) {
        return group.dataValues;
      }
      return null;
    });
    res.json({ contact, contactGroups });
  } catch (err) {
    console.error("FETCHING CONTACT ERROR", err);
  }
});

router.post("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contacts = await Contacts.findAll({
      where: {
        UserUuid: userId,
        email: {
          $contains: [
            {
              address: req.body.email
            }
          ]
        }
      }
    });
    if (isEmpty(contacts)) {
      const createdContact = await Contacts.create({
        UserUuid: userId,
        email: [
          {
            value: req.body.email,
            type: null
          }
        ],
        phone: [
          {
            value: req.body.phone,
            type: null
          }
        ],
        fullName: `${req.body.firstName ? req.body.firstName.trim() : ""} ${
          req.body.lastName ? req.body.lastName.trim() : ""
        }`,
        firstName: req.body.firstName && req.body.firstName.trim(),
        lastName: req.body.lastName && req.body.lastName.trim(),
        notes: req.body.notes,
        updated: moment(Date.now()).toISOString()
      });
      res.json(createdContact.dataValues);
    } else {
      res.json(contacts[0].dataValues);
    }
  } catch (err) {
    console.error(err);
  }
});

router.patch("/:id", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    req.body.updated = moment(Date.now()).toISOString();
    req.body.fullName = `${
      req.body.firstName ? req.body.firstName.trim() : ""
    } ${req.body.lastName ? req.body.lastName.trim() : ""}`;

    const updatedContact = await contact.update(req.body);
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });

    contact.destroy();
    res.json({
      message: "Listing Deleted Successfully"
    });
  } catch (err) {
    console.error(err);
  }
});

//////////// CONTACT LISTINGS ////////////
router.get("/:id/listings", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contactListings = await Listings.findAndCountAll({
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
      include: [
        {
          model: Contacts,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(contactListings);
  } catch (err) {
    console.error("FETCHING CONTACT LISTINGS ERROR", err);
  }
});

router.post("/:id/listings", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    await ListingContacts.bulkCreate(req.body.contactListings, {
      validate: false
    });
    const contactListings = await Listings.findAndCountAll({
      limit: 25,
      offset: 0,
      query: "",
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Contacts,
          where: {
            id: req.params.id
          }
        }
      ]
    });
    res.json(contactListings);
  } catch (err) {
    console.error("ERROR ADDING LISTINGS TO CONTACT", err);
  }
});

router.delete("/:id/listing", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await contact.removeListing(req.query.listingId);
    const contactListings = await Listings.findAndCountAll({
      limit: 25,
      offset: 0,
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Contacts,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(contactListings);
  } catch (err) {
    console.error("ERROR REMOVING LISTING FROM CONTACT", err);
  }
});

//////////// CONTACT GROUPS  ////////////
router.get("/:id/groups", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contactGroups = await Groups.findAndCountAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        [Op.and]: {
          title: {
            [Op.iLike]: `%${req.query.query}%`
          }
        }
      },
      include: [
        {
          model: Contacts,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["title", "ASC"]]
    });
    res.json(contactGroups);
  } catch (err) {
    console.error("FETCHING CONTACT GROUPS ERROR", err);
  }
});

router.post("/:id/groups", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    await ContactGroups.bulkCreate(req.body.contactGroups);
    const contactGroups = await Groups.findAndCountAll({
      limit: 25,
      offset: 0,
      query: "",
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Contacts,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["title", "ASC"]]
    });
    res.json(contactGroups);
  } catch (err) {
    console.error("ERROR ADDING GROUPS TO CONTACT", err);
  }
});

router.delete("/:id/group", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await contact.removeGroup(req.query.groupId);
    const contactGroups = await Groups.findAndCountAll({
      limit: 25,
      offset: 0,
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Contacts,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["title", "ASC"]]
    });
    res.json(contactGroups);
  } catch (err) {
    console.error("ERROR REMOVING GROUP FROM CONTACT", err);
  }
});

//////////// CONTACT IMAGES  ////////////
router.post("/images", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.body.componentId,
        UserUuid: userId
      }
    });
    let images = contact.images;
    if (!images || images.length === 0) {
      images = req.body.images;
    } else {
      images = images.concat(req.body.images);
    }
    const updatedContact = await contact.update({ images });
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id/image", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    const imageArray = contact.images;
    imageArray.splice(imageArray.indexOf(req.query.imageURI), 1);

    const updatedContact = await contact.update({
      images: imageArray.length === 0 ? null : imageArray
    });
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
