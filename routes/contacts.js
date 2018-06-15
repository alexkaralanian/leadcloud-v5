const express = require("express");
const moment = require("moment");
const isEmpty = require("lodash.isempty");
const { google } = require("googleapis");

const { oAuth2Client } = require("../services/googleapis");
const findUserById = require("../middlewares/findUserById");
const authCheck = require("../middlewares/authChecker");
const Contacts = require("../db/models").contacts;
const Listings = require("../db/models").listings;
const ContactTags = require("../db/models").contactTags;

const router = express.Router();
const people = google.people("v1");

// FETCH, MAP, AND LOAD USER'S GROUPS AND CONTACTS TO DB
router.get("/loadcontacts", authCheck, findUserById, async (req, res) => {
  try {
    const userId = req.session.user.toString();

    // FETCH, MAP, & LOAD USER'S GROUPS
    const groups = await new Promise((resolve, reject) => {
      people.contactGroups.list(
        {
          auth: oAuth2Client
        },
        (err, response) => {
          if (response) {
            resolve(response.data);
          } else {
            reject(err);
          }
        }
      );
    });

    groups.contactGroups.map(async group => {
      await ContactTags.findOrCreate({
        where: {
          UserUuid: userId,
          googleId: group.resourceName.slice(
            group.resourceName.indexOf("/") + 1 // contactGroups/...
          )
        },
        defaults: {
          title: group.name
        }
      });
    });

    // FETCH USER'S GOOGLE CONTACTS
    const contacts = await new Promise((resolve, reject) => {
      let contactsArray = [];
      const getContacts = pageToken => {
        people.people.connections.list(
          {
            resourceName: "people/me",
            personFields:
              "metadata,names,addresses,emailAddresses,phoneNumbers,memberships,occupations,organizations,photos,birthdays",
            auth: oAuth2Client,
            pageSize: 2000,
            pageToken
          },
          (err, response) => {
            if (response) {
              contactsArray = contactsArray.concat(response.data.connections);
              if (response.data.nextPageToken) {
                getContacts(response.data.nextPageToken);
              } else {
                resolve(contactsArray);
              }
            } else {
              reject(err);
            }
          }
        );
      };
      getContacts();
    });

    // MAP & LOAD USER CONTACTS TO DB
    contacts.map(async contact => {
      const imageArray =
        contact.photos && contact.photos.map(photo => photo.url);

      const membershipArray =
        contact.memberships &&
        contact.memberships.map(
          group => group.contactGroupMembership.contactGroupId
        );

      const defaults = {
        firstName:
          contact.names &&
          contact.names[0].givenName &&
          contact.names[0].givenName,
        lastName:
          contact.names &&
          contact.names[0].familyName &&
          contact.names[0].familyName,
        fullName:
          contact.names &&
          contact.names[0].displayName &&
          contact.names[0].displayName,
        email: contact.emailAddresses && contact.emailAddresses,
        phone: contact.phoneNumbers && contact.phoneNumbers,
        address: contact.addresses && contact.addresses,
        membership: membershipArray,
        updated: moment(contact.metadata.sources[0].updateTime).format(),
        images: imageArray
      };

      const createdContact = await Contacts.findOrCreate({
        where: {
          googleId: contact.metadata.sources[0].id,
          UserUuid: userId
        },
        defaults
      });
      await createdContact[0].setUser(userId);
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

// GET ALL CONTACTS FROM DB
router.get("/", async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contacts = await Contacts.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        $and: {
          fullName: {
            $iLike: `${req.query.query}%`
          }
        }
      },
      order: [["updated", "DESC"]]
    });

    res.json(contacts);
  } catch (err) {
    console.error(err);
  }
});

// CREATE NEW CONTACT
router.post("/new", authCheck, async (req, res) => {
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

// GET SINGLE CONTACT
router.get("/:id", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    res.json(contact);
  } catch (err) {
    console.error(err);
  }
});

// UPDATE CONACT
router.patch("/:id/update", authCheck, async (req, res) => {
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

// DELETE CONTACT
router.delete("/:id/delete", authCheck, async (req, res) => {
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

// CONTACT LISTINGS

router.post("/fetchContactListings", authCheck, async (req, res) => {
  try {
    const contact = await Contacts.findById(req.body.contactId);
    const listings = await contact.getListings();
    res.json(listings.map(listing => listing.dataValues));
  } catch (err) {
    console.error(err);
  }
});

router.post("/setContactListing", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const listing = await Listings.findOne({
      where: {
        id: req.body.listingId,
        UserUuid: userId
      }
    });

    await listing.addContact(req.body.contactId);

    const contact = await Contacts.findOne({
      where: {
        id: req.body.contactId,
        UserUuid: userId
      }
    });
    await contact.addListing(req.body.listingId);

    const listings = await contact.getListings();
    res.json(listings.map(listing => listing.dataValues));
  } catch (err) {
    console.error(err);
  }
});

router.post("/deleteContactListing", authCheck, async (req, res) => {
  try {
    const contact = await Contacts.findById(req.body.contactId);
    await contact.removeListing(req.body.listingId);

    const listings = await contact.getListings();
    res.json(listings.map(listing => listing.dataValues));
  } catch (err) {
    console.error(err);
  }
});

// GET CONTACT GROUPS
router.post("/groups", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contactTags = await ContactTags.findAll({
      where: {
        googleId: req.body.contactGroups,
        UserUuid: userId
      }
    });
    const tagsMap = contactTags.map(group => {
      if (group !== null) {
        return group;
      }
      return null;
    });

    res.json(tagsMap);
  } catch (err) {
    console.error(err);
  }
});

router.post("/new/openhouse", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contact = await Contacts.findAll({
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

    // query return an array
    if (isEmpty(contact)) {
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

      const listing = await Listings.findById(req.body.listingId);
      listing.addContact(createdContact.id);
      createdContact.addListing(req.body.listingId);
      res.json(createdContact.dataValues);
    } else {
      res.json(contact[0].dataValues);
    }
  } catch (err) {
    console.error(err);
  }
});

// ADD NEW IMAGES
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

// DELETE IMAGES
router.post("/images/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.body.contactId
      }
    });
    const imageArray = contact.images;
    imageArray.splice(imageArray.indexOf(req.body.image), 1);

    const updatedContact = contact.update({
      images: imageArray.length === 0 ? null : imageArray
    });

    res.json(updatedContact);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
