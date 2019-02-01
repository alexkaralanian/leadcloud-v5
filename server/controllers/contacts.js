const moment = require("moment");
const Sequelize = require("sequelize");
const isEmpty = require("lodash.isempty");

const Contacts = require("../db/models").contacts;

const Op = Sequelize.Op;

exports.getAll = async (req, res) => {
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
        order: [["updated", "DESC"], ["fullName", "ASC"]]
      });
    } else {
      contacts = await Contacts.findAndCountAll({
        limit: req.query.limit,
        offset: req.query.offset,
        where: {
          UserUuid: userId
        },
        order: [["updated", "DESC"], ["fullName", "ASC"]]
      });
    }
    res.json(contacts);
  } catch (err) {
    console.error("FETCHING CONTACTS ERROR", err);
  }
};

exports.getOne = async (req, res) => {
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
};

exports.create = async (req, res) => {
  console.log("REQ.BODY", req.body);
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

    console.log("CONTACTS", contacts);

    if (isEmpty(contacts)) {
      const createdContact = await Contacts.create({
        UserUuid: userId,
        email: req.body.email,
        phone: req.body.phone,
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
};

exports.update = async (req, res) => {
  console.log("UPDATE CALLED", req.body);
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    req.body.updated = moment(Date.now()).toISOString();
    req.body.fullName = `${req.body.firstName ? req.body.firstName.trim() : ""} ${
      req.body.lastName ? req.body.lastName.trim() : ""
    }`;

    if (!contact.email) {
      req.body.email = [
        {
          type: "primary",
          value: req.body.email.trim()
        }
      ];
    }
    const updatedContact = await contact.update(req.body);
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
  }
};

exports.delete = async (req, res) => {
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
};
