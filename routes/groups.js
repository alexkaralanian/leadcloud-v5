const express = require("express");
const isEmpty = require("lodash.isempty");
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

// GET ALL GROUPS FROM DB
router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const groups = await Groups.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        $and: {
          title: {
            $iLike: `${req.query.query}%`
          }
        }
      }
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
          $iLike: req.body.title
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

// GET GROUP CONTACTS
router.get("/:id/contacts", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groupContacts = await Contacts.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId,
        $and: {
          fullName: {
            $iLike: `${req.query.query}%`
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
      ]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("FETCHING GROUP CONTACTS ERROR", err);
  }
});

// ADD CONTACT TO GROUP
router.post("/:id/contact-groups/add", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        UserUuid: userId,
        id: req.body.contactGroupId
      }
    });
    await group.addContact(req.body.contactId);

    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.body.contactId
      }
    });
    const contactGroups = await contact.getGroups();
    res.json(contactGroups);
  } catch (err) {
    console.error("ERROR ADDING CONTACT TO GROUP");
  }
});

// REMOVE CONTACT FROM CONTACT GROUP
router.post("/:id/contact-groups/delete", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        UserUuid: userId,
        id: req.body.contactGroupId
      }
    });
    await group.removeContact(req.body.contactId);

    const contact = await Contacts.findOne({
      where: {
        UserUuid: userId,
        id: req.body.contactId
      }
    });
    const contactGroups = await contact.getGroups();
    res.json(contactGroups);
  } catch (err) {
    console.error("ERROR REMOVING CONTACT FROM GROUP");
  }
});

// ADD CONTACT TO GROUP CONTACTS
router.post("/:id/group-contacts/add", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const group = await Groups.findOne({
      where: {
        UserUuid: userId,
        id: req.body.groupId
      }
    });
    await group.addContact(req.body.groupContactId);

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
      ]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("ERROR ADDING CONTACT TO GROUP");
  }
});

// REMOVE CONTACT FROM GROUP CONTACTS
router.post("/:id/group-contacts/delete", authCheck, async (req, res) => {
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
      ]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("ERROR REMOVING CONTACT FROM GROUP");
  }
});

module.exports = router;
