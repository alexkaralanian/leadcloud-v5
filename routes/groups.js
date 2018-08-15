const express = require("express");
const isEmpty = require("lodash.isempty");
const Sequelize = require("sequelize");
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const ContactGroups = require("../db/models").ContactGroups;
const authCheck = require("../middlewares/authChecker");

const router = express.Router();
const Op = Sequelize.Op;

// GET ALL GROUPS
router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const groups = await Groups.findAndCountAll({
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
      order: [["updatedAt", "DESC"]]
    });
    res.json(groups);
  } catch (err) {
    console.error("FETCHING GROUPS ERROR", err);
  }
});

// GET SINGLE GROUP
router.get("/:id", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    res.json(group);
  } catch (err) {
    console.error("FETCHING GROUP ERROR", err.response);
  }
});

// CREATE NEW GROUP
router.post("/new", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const groups = await Groups.findAll({
      where: {
        UserUuid: userId,
        title: {
          [Op.iLike]: req.body.title
        }
      }
    });
    if (isEmpty(groups)) {
      const createdGroup = await Groups.create({
        UserUuid: userId,
        title: req.body.title
      });
      res.json(createdGroup.dataValues);
    } else {
      res.json(groups[0].dataValues);
    }
  } catch (err) {
    console.error("ERROR CREATING GROUP", err);
  }
});

// UPDATE GROUP
router.patch("/:id/update", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    const updatedGroup = await group.update(req.body);
    res.json(updatedGroup);
  } catch (err) {
    console.error(err);
  }
});

// DELETE GROUP
router.delete("/:id/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    group.destroy();
    res.json({
      message: "Group Deleted Successfully"
    });
  } catch (err) {
    console.error(err);
  }
});

/////////////// GROUP CONTACTS ///////////////

// RETURN ALL GROUP-CONTACTS
router.get("/:id/contacts", authCheck, async (req, res) => {
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
});

// BULK ADD CONTACTS TO GROUP AND RETURN GROUP-CONTACTS
router.post("/:id/contacts/add", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    await ContactGroups.bulkCreate(req.body.groupContacts);

    const groupContacts = await Contacts.findAll({
      limit: 25,
      offset: 0,
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Groups,
          where: {
            id: req.body.groupId
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });

    res.json(groupContacts);
  } catch (err) {
    console.error("ERROR ADDING CONTACTS TO GROUP", err);
  }
});

// REMOVE CONTACT FROM GROUP AND RETURN GROUP-CONTACTS
router.post("/:id/contacts/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        UserUuid: userId,
        id: req.body.groupId
      }
    });
    await group.removeContact(req.body.groupContactId);

    const groupContacts = await Contacts.findAll({
      limit: 25,
      offset: 0,
      where: {
        UserUuid: userId
      },
      include: [
        {
          model: Groups,
          where: {
            id: req.body.groupId
          }
        }
      ],
      order: [["updatedAt", "DESC"]]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("ERROR REMOVING CONTACT FROM GROUP");
  }
});

module.exports = router;
