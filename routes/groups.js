const express = require("express");

const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groups = await Groups.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: {
        UserUuid: userId
      },
      $and: {
        title: {
          $iLike: `${req.query.query}%`
        }
      }
    });
    res.json(groups);
  } catch (err) {
    console.error("FETCHING GROUPS ERROR", err);
  }
});

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

router.get("/:id/contacts", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groupContacts = await Contacts.findAll({
      limit: req.query.limit,
      offset: req.query.offset,
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
      ]
    });
    res.json(groupContacts);
  } catch (err) {
    console.error("FETCHING GROUP CONTACTS ERROR", err);
  }
});

router.post("/new", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const group = await Groups.create({
      UserUuid: userId,
      title: req.body.values.title
    });
    res.json(group);
  } catch (err) {
    console.error("CREATING GROUP CONTACTS ERROR", err);
  }
});

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
    const group = await Contacts.findOne({
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

module.exports = router;
