const Sequelize = require("sequelize");

const ContactGroups = require("../db/models").ContactGroups;
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;

const Op = Sequelize.Op;

exports.getAll = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groupContacts = await Contacts.findAndCountAll({
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
          model: Groups,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("FETCHING GROUP CONTACTS ERROR", err);
  }
};

exports.create = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    await ContactGroups.bulkCreate(req.body.groupContacts);
    const groupContacts = await Contacts.findAndCountAll({
      limit: 25,
      offset: 0,
      query: "",
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Groups,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("ERROR ADDING CONTACTS TO GROUP", err);
  }
};

exports.delete = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const group = await Groups.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await group.removeContact(req.query.contactId);
    const groupContacts = await Contacts.findAndCountAll({
      limit: 25,
      offset: 0,
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Groups,
          where: {
            id: req.params.id
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("ERROR REMOVING CONTACT FROM GROUP");
  }
};
