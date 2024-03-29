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
  const userId = req.session.user.toString();
  try {
    const contacts = await Contacts.findAll({
      where: {
        UserUuid: userId,
        email: {
          $contains: [
            {
              value: req.body.email[0].value // need to account for all possible values, get better that conditional object rendering and queries.
            }
          ]
        }
      }
    });

    if (isEmpty(contacts)) {
      const createdContact = await Contacts.create({
        UserUuid: userId,
        firstName: req.body.firstName && req.body.firstName.trim(),
        lastName: req.body.lastName && req.body.lastName.trim(),
        fullName: `${req.body.firstName ? req.body.firstName.trim() : ""} ${
          req.body.lastName ? req.body.lastName.trim() : ""
        }`,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        organizations: req.body.organizations,
        priority: req.body.priority,
        type: req.body.type,
        income: req.body.income,
        creditScore: req.body.creditScore,
        budget: req.body.budget,
        netWorth: req.body.netWorth,
        notes: req.body.notes,
        updated: Date.now()
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
