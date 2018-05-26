const express = require("express");
const moment = require("moment");

const Listings = require("../db/models").listings;
const Contacts = require("../db/models").contacts;

const router = express.Router();

// Fetch all listings
router.get("/", (req, res, next) => {
  const userId = req.session.user.toString();

  Listings.findAll({
    where: {
      UserId: userId
    },
    order: "updated DESC"
  })
    .then(listings => {
      res.json(listings);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// Create new listing
router.post("/new", (req, res, next) => {
  const userId = req.session.user.toString();

  Listings.create({
    UserId: userId,
    address: req.body.address,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    updated: moment(Date.now()).toISOString(),
    listingContacts: []
  })
    .then(response => {
      res.json(response.dataValues);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// Update listing
router.patch("/:id/update", (req, res, next) => {
  const userId = req.session.user.toString();

  Listings.findOne({
    where: {
      id: req.params.id,
      UserId: userId
    }
  })
    .then(listing => {
      listing.update(req.body).then(updatedListing => {
        res.json(updatedListing);
      });
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// Delete listing
router.delete("/:id/delete", (req, res, next) => {
  const userId = req.session.user.toString();

  Listings.findOne({
    where: {
      id: req.params.id,
      UserId: userId
    }
  })
    .then(listing => {
      listing.destroy();
      res.json({
        message: "Listing Deleted Successfully"
      });
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// Fetch single listing
router.get("/:id", (req, res, next) => {
  const userId = req.session.user.toString();

  Listings.findOne({
    where: {
      id: req.params.id,
      UserId: userId
    }
  })
    .then(listing => {
      res.json(listing);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

// LISTING CONTACTS
router.post("/setListingContacts", (req, res, next) => {
  const userId = req.session.user.toString();
  Contacts.findOne({
    where: {
      id: req.body.contactId,
      UserId: userId
    }
  })
    .then(contact => contact.addListing(req.body.listingId))
    .then(() => {
      Listings.findOne({
        where: {
          id: req.body.listingId,
          UserId: userId
        }
      }).then(listing => {
        listing.addContact(req.body.contactId).then(() => {
          listing
            .getContacts()
            .then(contacts =>
              res.json(contacts.map(contact => contact.dataValues))
            );
        });
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.post("/fetchListingContacts", (req, res, next) => {
  Listings.findById(req.body.listingId)
    .then(listing => {
      listing
        .getContacts()
        .then(contacts =>
          res.json(contacts.map(contact => contact.dataValues))
        );
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.post("/deleteListingContact", (req, res, next) => {
  Listings.findById(req.body.listingId)
    .then(listing => {
      listing.removeContact(req.body.contactId).then(() => {
        listing
          .getContacts()
          .then(contacts =>
            res.json(contacts.map(contact => contact.dataValues))
          );
      });
    })
    .catch(err => {
      console.error(err);
    });
});

// LISTING IMAGES
router.post("/images", (req, res) => {
  const userId = req.session.user.toString();
  Listings.findOne({
    where: {
      id: req.body.listingId,
      UserId: userId
    }
  }).then(listing => {
    let images = listing.images;

    if (!images || images.length === 0) {
      images = req.body.images;
    } else {
      images = images.concat(req.body.images);
    }
    listing
      .update({
        images
      })
      .then(updatedListing => {
        res.json(updatedListing);
      });
  });
});

router.post("/images/delete", (req, res) => {
  const userId = req.session.user.toString();
  Listings.findOne({
    where: {
      UserId: userId,
      id: req.body.listingId
    }
  }).then(listing => {
    const imageArray = listing.images;
    imageArray.splice(imageArray.indexOf(req.body.image), 1);
    listing
      .update({
        images: imageArray.length === 0 ? null : imageArray
      })
      .then(updatedListing => {
        res.json(updatedListing);
      });
  });
});

module.exports = router;
