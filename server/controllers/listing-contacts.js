const Sequelize = require("sequelize");
const Listings = require("../db/models").listings;
const Contacts = require("../db/models").contacts;
const ListingContacts = require("../db/models").ListingContacts;

const Op = Sequelize.Op;

exports.getAll = async (req, res) => {
  const userId = req.session.user.toString();
  let listingContacts;
  try {
    if (req.query.query) {
      listingContacts = await Contacts.findAndCountAll({
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
    } else {
      listingContacts = await Contacts.findAndCountAll({
        limit: req.query.limit,
        offset: req.query.offset,
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
    }
    res.json(listingContacts);
  } catch (err) {
    console.error("FETCHING LISTING CONTACTS ERROR", err);
  }
};

exports.add = async (req, res) => {
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
};

exports.remove = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listing = await Listings.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await listing.removeContact(req.query.contactId);
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
};
