const express = require("express");
const sendgrid = require("sendgrid");
const helper = sendgrid.mail;

const Campaigns = require("../db/models").campaigns;
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const authCheck = require("../middlewares/authChecker");

const Mailer = require("../services/sendgrid");
const campaignTemplate = require("../services/emailTemplates/campaignTemplate");

const router = express.Router();

const cleanString = str =>
  str
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const cleanContacts = contactsArray => {
  const contacts = [];
  contactsArray.forEach(contact => {
    const name = contact.dataValues.firstName || null;
    if (contact.dataValues.email) {
      contact.dataValues.email.forEach(email => {
        if (!contacts.includes(email[email.value])) {
          contacts.push(new helper.Email(email.value.trim(), name.trim()));
        }
      });
    }
  });
  return contacts;
};

router.post("/create", authCheck, async (req, res) => {
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

    const cleanedContacts = cleanContacts(
      contacts.reduce((sum, contactArray) => sum.concat(contactArray[0]))
    );

    console.log("CLEANED CONTACTS", cleanedContacts);

    const campaign = await Campaigns.findOrCreate({
      where: {
        UserUuid: userId,
        title: cleanString(req.body.values.title)
      },
      defaults: {
        subject: req.body.values.subject,
        groups: req.body.campaignGroups,
        listings: req.body.campaignListings,
        recipients: cleanedContacts
      }
    });

    // CAMPAIGN MAILER
    // const mailer = new Mailer(campaign, campaignTemplate(campaign));
    // mailer.send();

    // res.json(campaign);
  } catch (err) {
    console.error("FETCHING CAMPAIGNS ERROR", err);
  }
});
module.exports = router;
