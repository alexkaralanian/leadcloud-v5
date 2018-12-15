const Sequelize = require("sequelize");
const Contacts = require("../db/models").contacts;
const Listings = require("../db/models").listings;
const ListingContacts = require("../db/models").ListingContacts;
const Op = Sequelize.Op;

exports.getAll = async (req, res) => {
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
};

exports.add = async (req, res) => {
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
};

exports.remove = async (req, res) => {
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
};
