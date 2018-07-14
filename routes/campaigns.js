const express = require("express");
const Campaigns = require("../db/models").campaigns;
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const authCheck = require("../middlewares/authChecker");
const Mailer = require("../services/sendgrid");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const router = express.Router();

const cleanString = str =>
  str
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const cleanEmails = emailArray => {
  const emails = [];
  emailArray.forEach(group => {
    if (group.dataValues.email && group.dataValues.email[0].value) {
      emails.push(group.dataValues.email[0].value.trim());
    }
  });
  return emails;
};

router.post("/create", authCheck, async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const emailPromises = req.body.campaignGroups.map(
      async group =>
        await Contacts.findAll({
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
        })
    );

    const emails = await Promise.all(emailPromises);

    const cleanedEmails = cleanEmails(
      emails.reduce((sum, emailArray) => sum.concat(emailArray))
    );

    const campaign = await Campaigns.findOrCreate({
      where: {
        UserUuid: userId,
        title: cleanString(req.body.values.title)
      },
      defaults: {
        subject: req.body.values.subject,
        listings: req.body.campaignListings,
        recipients: cleanedEmails
      }
    });

    // res.json(campaign);
  } catch (err) {
    console.error("FETCHING CAMPAIGNS ERROR", err);
  }
});
module.exports = router;
