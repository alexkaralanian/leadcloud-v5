const express = require("express");

const Contacts = require("../db/models").contacts;
const ContactTags = require("../db/models").contactTags;
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const groups = await ContactTags.findAll({
      where: {
        UserUuid: userId
      }
    });
    res.json(groups);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const contacts = await Contacts.findAll({
      where: {
        UserUuid: userId,
        membership: {
          $contains: [req.params.id]
        }
      }
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
