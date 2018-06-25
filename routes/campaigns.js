const express = require("express");

// const Contacts = require("../db/models").contacts;
// const ContactTags = require("../db/models").contactTags;
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.post("/create", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  // find all contacts associated to groups
  // associate listings to campaigns
  // associate contacts to campaigns
  // associate groups to campaigns
  // check for duplicates.

  try {
    // const groups = await ContactTags.findAll({
    //   limit: req.query.limit,
    //   offset: req.query.offset,
    //   where: {
    //     UserUuid: userId
    //   },
    //   $and: {
    //     title: {
    //       $iLike: `${req.query.query}%`
    //     }
    //   }
    // });
    // res.json(groups);
    res.json("HELLO FROM CAMPAIGNS");
    console.log("CREATE CAMAPAIGN", req.body);
  } catch (err) {
    console.error("FETCHING CAMPAIGNS ERROR", err);
  }
});
module.exports = router;
