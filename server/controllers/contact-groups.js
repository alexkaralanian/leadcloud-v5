const Sequelize = require("sequelize");
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const ContactGroups = require("../db/models").ContactGroups;
const Op = Sequelize.Op;

exports.getContactGroups = async (req, res) => {
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
};

exports.addContactGroups = async (req, res) => {
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
};

exports.removeContactGroup = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    await contact.removeGroup(req.query.groupId);
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
};
