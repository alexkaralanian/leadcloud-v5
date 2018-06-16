const express = require("express");

const Contacts = require("../db/models").contacts;
const ContactTags = require("../db/models").contactTags;
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.get("/", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groups = await ContactTags.findAll({
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

// router.get("/:googleId", authCheck, async (req, res) => {
//   const userId = req.session.user.toString();
//   try {
//     const group = await ContactTags.findOne({
//       where: {
//         UserUuid: userId,
//         googleId: req.params.googleId
//       }
//     });
//     res.json(group);
//   } catch (err) {
//     console.error("FETCHING GROUP ERROR", err.response);
//   }
// });

router.get("/:googleId/contacts", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const groupContacts = await Contacts.findAll({
      where: {
        UserUuid: userId,
        membership: {
          $contains: [req.params.googleId]
        }
      }
    });

    res.json(groupContacts);
  } catch (err) {
    console.error("FETCHING GROUP CONTACTS ERROR", err);
  }
});

module.exports = router;
