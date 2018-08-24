const express = require("express");
const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const { cleanString, cleanContacts } = require("../helpers/helpers");

const Campaigns = require("../db/models").campaigns;
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const authCheck = require("../middlewares/authChecker");

const Mailer = require("../services/sendgrid");
const campaignTemplate = require("../services/emailTemplates/campaignTemplate");

const router = express.Router();

// CREATE CAMPAIGN
router.post("/create", authCheck, async (req, res) => {
  console.log("REQ.BODY", req.body);
  const userId = req.session.user.toString();
  try {
    const campaign = await Campaigns.findOrCreate({
      where: {
        UserUuid: userId,
        title: cleanString(req.body.values.title)
      },
      defaults: {
        subject: req.body.values.subject,
        body: req.body.values.body,
        groups: req.body.campaignGroups,
        listings: req.body.campaignListings,
        isDraft: true
      }
    });

    res.json(campaign[0]);
  } catch (err) {
    console.error("CREATING CAMPAIGNS ERROR", err);
  }
});

// SUBMIT CAMPAIGN
router.post("/submit", authCheck, async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const emailPromises = await req.body.campaignGroups.map(
      async group =>
        await Contacts.findAll({
          attributes: ["firstName", "email"],
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
        })
    );
    const contacts = await Promise.all(emailPromises);

    // concat all group contacts arrays into 1 array
    // pass that single array the cleanContacts
    const cleanedContacts = cleanContacts(
      contacts.reduce((sum, contactArray) => sum.concat(contactArray[0]))
    );

    const campaign = await Campaigns.update({
      where: {
        UserUuid: userId,
        id: req.body.campaignId
      },
      defaults: {
        subject: req.body.values.subject,
        groups: req.body.campaignGroups,
        listings: req.body.campaignListings,
        recipients: cleanedContacts,
        isDraft: false
      }
    });

    // CAMPAIGN MAILER
    const mailer = new Mailer(
      {
        subject: campaign[0].dataValues.subject,
        recipients: campaign[0].dataValues.recipients
      },
      campaignTemplate(campaign[0].dataValues)
    );
    mailer.send();

    res.json(campaign);
  } catch (err) {
    console.error("SUBMITTING CAMPAIGNS ERROR", err);
  }
});

router.get("/", async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const campaigns = await Campaigns.findAll({
      where: {
        UserUuid: userId
      },
      order: [["createdAt", "DESC"]]
    });
    res.json(campaigns);
  } catch (err) {
    console.error("FETCHING CAMPAIGNS ERROR", err);
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const campaign = await Campaigns.findOne({
      where: {
        UserUuid: userId,
        id: req.params.id
      }
    });
    res.json(campaign);
  } catch (err) {
    console.error("FETCHING CAMPAIGN ERROR", err);
  }
});

module.exports = router;
