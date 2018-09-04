const express = require("express");
const moment = require("moment");
const Sequelize = require("sequelize");
const isEmpty = require("lodash.isempty");
const { google } = require("googleapis");

const { oAuth2Client } = require("../services/googleapis");
const findUserById = require("../middlewares/findUserById");
const authCheck = require("../middlewares/authChecker");
const Contacts = require("../db/models").contacts;
const Listings = require("../db/models").listings;
const Groups = require("../db/models").groups;
const ListingContacts = require("../db/models").ListingContacts;
const ContactGroups = require("../db/models").ContactGroups;

const router = express.Router();
const people = google.people("v1");
const Op = Sequelize.Op;

// // FETCH, MAP, AND LOAD USER'S GROUPS AND CONTACTS TO DB
// router.get("/loadcontacts", authCheck, findUserById, async (req, res) => {
//   const userId = req.session.user.toString();

//   // FETCH, MAP, & LOAD USER'S GROUPS
//   const groups = await new Promise((resolve, reject) => {
//     people.contactGroups.list(
//       {
//         auth: oAuth2Client
//       },
//       (err, response) => {
//         if (response) {
//           resolve(response.data);
//         } else {
//           reject(err);
//         }
//       }
//     );
//   }).catch(err => {
//     console.error(err);
//   });

//   await groups.contactGroups.map(async group => {
//     try {
//       await Groups.findOrCreate({
//         where: {
//           UserUuid: userId,
//           googleId: group.resourceName.slice(
//             group.resourceName.indexOf("/") + 1 // contactGroups/...
//           )
//         },
//         defaults: {
//           title: group.name
//         }
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   });

//   // FETCH GOOGLE CONTACTS
//   const contacts = await new Promise((resolve, reject) => {
//     let contactsArray = [];
//     const getContacts = pageToken => {
//       people.people.connections.list(
//         {
//           resourceName: "people/me",
//           personFields:
//             "metadata,names,addresses,emailAddresses,phoneNumbers,memberships,occupations,organizations,photos,birthdays",
//           auth: oAuth2Client,
//           pageSize: 2000,
//           pageToken
//         },
//         (err, response) => {
//           if (response) {
//             contactsArray = contactsArray.concat(response.data.connections);
//             if (response.data.nextPageToken) {
//               getContacts(response.data.nextPageToken);
//             } else {
//               resolve(contactsArray);
//             }
//           } else {
//             reject(err);
//           }
//         }
//       );
//     };
//     getContacts();
//   });

//   // MAP & LOAD GOOGLE CONTACTS TO DB
//   await contacts.map(async contact => {
//     const imageArray = contact.photos && contact.photos.map(photo => photo.url);

//     const membershipArray =
//       contact.memberships &&
//       contact.memberships.map(
//         group => group.contactGroupMembership.contactGroupId
//       );

//     const defaults = {
//       firstName:
//         contact.names &&
//         contact.names[0].givenName &&
//         contact.names[0].givenName,
//       lastName:
//         contact.names &&
//         contact.names[0].familyName &&
//         contact.names[0].familyName,
//       fullName:
//         contact.names &&
//         contact.names[0].displayName &&
//         contact.names[0].displayName,
//       email: contact.emailAddresses && contact.emailAddresses,
//       phone: contact.phoneNumbers && contact.phoneNumbers,
//       address: contact.addresses && contact.addresses,
//       membership: membershipArray,
//       updated: moment(contact.metadata.sources[0].updateTime).format(
//         "YYYY-MM-DD HH:mm:ss.SSS"
//       ),
//       images: imageArray
//     };

//     const createdContact = await Contacts.findOrCreate({
//       where: {
//         googleId: contact.metadata.sources[0].id,
//         UserUuid: userId
//       },
//       defaults
//     });

//     contact.memberships &&
//       contact.memberships.map(async group => {
//         const contactGroup = await Groups.findOne({
//           where: { googleId: group.contactGroupMembership.contactGroupId }
//         });
//         await contactGroup.addContact(createdContact[0].id.toString());
//       });
//   });
//   res.sendStatus(200);
// });

// GET ALL CONTACTS FROM DB
router.get("/", async (req, res) => {
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

// BULK ADD LISTINGS TO CONTACT AND RETURN LISTING-CONTACTS
router.post("/:id/listings/add", authCheck, async (req, res) => {
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

router.post("/:id/listing/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await contact.removeListing(req.body.listingId);

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

router.post("/:id/groups/add", authCheck, async (req, res) => {
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

// REMOVE GROUP FROM CONTACT AND RETURN CONTACT-GROUPS
router.post("/:id/group/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  console.log("REQ.bODY", req.body);
  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await contact.removeGroup(req.body.groupId);
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

//////////// OPEN HOUSE  ////////////

// LAUNCH OPEN HOUSE FORM LISTING
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

module.exports = router;
