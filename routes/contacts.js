const express = require("express");
const moment = require("moment");
const _ = require("lodash");
const { google } = require("googleapis");

const Users = require("../db/models").users;
const Contacts = require("../db/models").contacts;
const Listings = require("../db/models").listings;
const ContactTags = require("../db/models").contactTags;

const { oAuth2Client } = require("../services/googleapis");

const router = express.Router();
const people = google.people("v1");

// FETCH, MAP, AND LOAD USER'S GROUPS AND CONTACTS TO DB
router.get("/loadcontacts", (req, res, next) => {
  Users.findById(req.session.user.id).then(user => {
    oAuth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken,
      expiry_date: new Date().getTime() + 1000 * 60 * 60 * 24 * 7
    });
  });

  // FETCH, MAP, & LOAD USER'S GROUPS
  new Promise((resolve, reject) => {
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
  })
    .then(groups => {
      groups.contactGroups.map(group => {
        ContactTags.findOrCreate({
          where: {
            UserId: req.session.user.id,
            googleId: group.resourceName.slice(
              group.resourceName.indexOf("/") + 1 // contactGroups/...
            )
          },
          defaults: {
            title: group.name
          }
        });
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });

  // FETCH, MAP, & LOAD ALL GOOGLE CONTACTS
  new Promise((resolve, reject) => {
    let contactsArray = [];
    function getContacts(pageToken) {
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
    }
    getContacts();
  })
    .then(results => {
      // MAP CONTACTS TO DB SCHEMA
      return results.map(contact => {
        const imageArray = contact.photos
          ? contact.photos.map(photo => {
              return photo.url;
            })
          : null;

        const membershipArray = contact.memberships
          ? contact.memberships.map(group => {
              return group.contactGroupMembership.contactGroupId;
            })
          : null;

        const defaults = {
          firstName:
            contact.names && contact.names[0].givenName
              ? contact.names[0].givenName
              : null,
          lastName:
            contact.names && contact.names[0].familyName
              ? contact.names[0].familyName
              : null,
          fullName:
            contact.names && contact.names[0].displayName
              ? contact.names[0].displayName
              : null,
          email: contact.emailAddresses ? contact.emailAddresses : null,
          phone: contact.phoneNumbers ? contact.phoneNumbers : null,
          address: contact.addresses ? contact.addresses : null,
          membership: membershipArray,
          updated: moment(contact.metadata.sources[0].updateTime).format(),
          images: imageArray
        };

        // LOAD CONTACTS TO DB
        Contacts.findOrCreate({
          where: {
            googleId: contact.metadata.sources[0].id,
            UserId: req.session.user.id
          },
          defaults
        }).then(createdContact => {
          createdContact[0].setUser(req.session.user.id);
        });
      });
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      next(err);
    });
});

// GET ALL CONTACTS FROM DB
router.get("/", (req, res, next) => {
  Contacts.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    where: {
      UserId: req.session.user.id,
      $and: {
        fullName: {
          $iLike: `${req.query.query}%`
        }
      }
    },
    order: [["updated", "DESC"], ["lastName", "ASC"]]
  })
    .then(contacts => {
      res.json(contacts);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// GET SINGLE CONTACT
router.get("/:id", (req, res, next) => {
  // RETURNS AN ARRAY!!!!!!!!
  Contacts.findOne({
    where: {
      id: req.params.id,
      UserId: req.session.user.id
    }
  })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// GET GROUPS
router.post("/groups", (req, res, next) => {
  ContactTags.findAll({
    where: {
      googleId: req.body.groups,
      UserId: req.session.user.id
    }
  })
    .then(response => {
      return response.map(group => {
        if (group !== null) {
          return group.dataValues.title;
        } else {
          return null;
        }
      });
    })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// UPDATE CONACT
router.patch("/:id/update", (req, res, next) => {
  Contacts.findOne({
    where: {
      id: req.params.id,
      UserId: req.session.user.id
    }
  })
    .then(contact => {
      req.body.updated = moment(Date.now()).toISOString();
      req.body.fullName = `${
        req.body.firstName ? req.body.firstName.trim() : ""
      } ${req.body.lastName ? req.body.lastName.trim() : ""}`;
      contact.update(req.body).then(updatedContact => {
        res.json(updatedContact);
      });
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// CREATE NEW CONTACT
router.post("/new", (req, res, next) => {
  Contacts.findAll({
    where: {
      UserId: req.session.user.id,
      email: {
        $contains: [
          {
            address: req.body.email
          }
        ]
      }
    }
  })
    .then(response => {
      // query return an array
      if (_.isEmpty(response)) {
        Contacts.create({
          UserId: req.session.user.id,
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
          firstName: req.body.firstName ? req.body.firstName.trim() : null,
          lastName: req.body.lastName ? req.body.lastName.trim() : null,
          notes: req.body.notes,
          updated: moment(Date.now()).toISOString()
        }).then(createdContact => {
          res.json(createdContact.dataValues);
        });
      } else {
        // here we are returning the first item - array[0]
        // however in certain cases where contacts were imported from another db this array may yield several items, in which we case we need to respond appropriately
        // maybe boolean flag with a pop-up window with option redirecting us to the user
        // also an option to merge existing contacts into 1 single contact

        // add an 'isUnique' flag
        // map over array
        // extract id name, emails...
        // return cleaned object
        //
        res.json(response[0].dataValues);
      }
    })
    .catch(error => {
      console.error(error);
      next(error);
    });

  // res.json("/listings/new", req.data);
});

router.post("/new/openhouse", (req, res, next) => {
  Contacts.findAll({
    where: {
      UserId: req.session.user.id,
      email: {
        $contains: [
          {
            address: req.body.email
          }
        ]
      }
    }
  })
    .then(response => {
      // query return an array
      if (_.isEmpty(response)) {
        Contacts.create({
          UserId: req.session.user.id,
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
        }).then(createdContact => {
          Listings.findById(req.body.listingId).then(listing => {
            listing.addContact(createdContact.id);
            createdContact.addListing(req.body.listingId);
            res.json(createdContact.dataValues);
          });
        });
      } else {
        // here we are returning the first item - array[0]
        // however in certain cases where contacts were imported from another db this array may yield several items, in which we case we need to respond appropriately
        // maybe boolean flag with a pop-up window with option redirecting us to the user
        // also an option to merge existing contacts into 1 single contact

        // add an 'isUnique' flag
        // map over array
        // extract id name, emails...
        // return cleaned object
        //
        res.json(response[0].dataValues);
      }
    })
    .catch(error => {
      console.error(error);
      next(error);
    });

  // res.json("/listings/new", req.data);
});

// DELETE CONTACT
router.delete("/:id/delete", (req, res, next) => {
  Contacts.findOne({
    where: {
      id: req.params.id,
      UserId: req.session.user.id
    }
  })
    .then(contact => {
      contact.destroy();
      res.json({
        message: "Listing Deleted Successfully"
      });
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// CONTACT LISTINGS

router.post("/fetchContactListings", (req, res, next) => {
  Contacts.findById(req.body.contactId)
    .then(contact => {
      contact
        .getListings()
        .then(listings =>
          res.json(listings.map(listing => listing.dataValues))
        );
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

// router.post("/setContactListings", (req, res, next) => {
//   Listings.findById(req.body.listingId)
//     .then(listing => {
//       listing.addContact(req.body.contactId);
//     })
//     .catch(err => {
//       console.error(err);
//       next(err);
//     });

//   Contacts.findById(req.body.contactId).then(contact => {
//     contact.addListing(req.body.listingId).then(() => {
//       contact
//         .getListings()
//         .then(listings => res.json(listings.map(listing => listing.dataValues)))
//         .catch(err => {
//           console.error(err);
//           next(err);
//         });
//     });
//   });
// });

// router.post("/deleteContactListing", (req, res, next) => {
//   Contacts.findById(req.body.contactId)
//     .then(contact => {
//       contact.removeListing(req.body.listingId).then(() => {
//         contact
//           .getListings()
//           .then(listings =>
//             res.json(listings.map(listing => listing.dataValues))
//           );
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       next(err);
//     });
// });

// ADD NEW IMAGES
router.post("/images", (req, res) => {
  Contacts.findOne({
    where: {
      id: req.body.contactId,
      UserId: req.session.user.id
    }
  }).then(contact => {
    let images = contact.images;
    if (!images || images.length === 0) {
      images = req.body.images;
    } else {
      images = images.concat(req.body.images);
    }
    contact
      .update({
        images
      })
      .then(updatedContact => {
        res.json(updatedContact);
      });
  });
});

// DELETE IMAGES
router.post("/images/delete", (req, res) => {
  Contacts.findOne({
    where: {
      UserId: req.session.user.id,
      id: req.body.contactId
    }
  }).then(contact => {
    const imageArray = contact.images;
    imageArray.splice(imageArray.indexOf(req.body.image), 1);
    contact
      .update({
        images: imageArray.length === 0 ? null : imageArray
      })
      .then(updatedContact => {
        res.json(updatedContact);
      });
  });
});

module.exports = router;