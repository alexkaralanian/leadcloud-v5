const express = require("express");
const Campaigns = require("../db/models").campaigns;
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const authCheck = require("../middlewares/authChecker");

const router = express.Router();

router.post("/create", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const campaign = await Campaigns.create({
      UserUuid: userId,
      title: req.body.values.title,
      listings: req.body.campaignListings,
      groups: req.body.campaignGroups
    });

    // const listings = req.body.campaignListings.map(listing => listing.id);

    await req.body.campaignGroups.map(async group => {
      const groupContacts = await Contacts.findAll({
        attributes: ["email"],
        where: {
          UserUuid: userId
        },
        include: [
          {
            model: Groups,
            where: {
              id: group.id
            }
          }
        ]
      });

      console.log(
        "GROUP CONTACTS",
        groupContacts.map(
          group => group.dataValues.email && group.dataValues.email[0].value
        )
      );
    });

    res.json(campaign);
  } catch (err) {
    console.error("FETCHING CAMPAIGNS ERROR", err);
  }
});
module.exports = router;
