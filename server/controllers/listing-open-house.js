const isEmpty = require("lodash.isempty");
const Sequelize = require("sequelize");
const Listings = require("../db/models").listings;
const Contacts = require("../db/models").contacts;

const Op = Sequelize.Op;

exports.create = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const listing = await Listings.findById(req.params.id);
    const contact = await Contacts.findAll({
      where: {
        UserUuid: userId,
        [Op.and]: {
          email: {
            [Op.contains]: [{ value: req.body.email }]
          }
        }
      }
    });
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
        lastName: req.body.lastName && req.body.lastName.trim()
      });
      await listing.addContact(createdContact.id);
    } else {
      await listing.addContact(contact[0].id);
    }
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
    console.error(err);
  }
};
