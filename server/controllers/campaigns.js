const cleanContacts = require("../helpers/sendgrid").cleanContacts;
const Campaigns = require("../db/models").campaigns;
const Contacts = require("../db/models").contacts;
const Groups = require("../db/models").groups;
const Mailer = require("../services/sendgrid");

exports.create = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const campaign = await Campaigns.create({
      UserUuid: userId,
      title: req.body.values.title,
      subject: req.body.values.subject,
      isDraft: true
    });
    res.json(campaign);
  } catch (err) {
    console.error("CREATING CAMPAIGNS ERROR", err);
  }
};

exports.update = async (req, res) => {
  const userId = req.session.user.toString();
  try {
    const campaign = await Campaigns.findOne({
      where: {
        id: req.params.id,
        UserUuid: userId
      }
    });
    const updatedCampaign = await campaign.update(req.body);
    res.json(updatedCampaign);
  } catch (err) {
    console.error(err);
  }
};

exports.send = async (req, res) => {
  const userId = req.session.user.toString();

  try {
    const campaign = await Campaigns.findOne({
      where: {
        UserUuid: userId,
        id: req.body.campaignId
      }
    });

    const emailPromises = await campaign.groups.map(async group => {
      const groupContacts = await Contacts.findAll({
        where: {
          UserUuid: userId
        },
        attributes: ["firstName", "email"],
        include: [
          {
            model: Groups,
            where: {
              id: group.id
            }
          }
        ]
      });
      return groupContacts;
    });
    const contacts = await Promise.all(emailPromises);

    // concat all group contacts arrays into 1 array
    // pass that single array the cleanContacts
    const cleanedContacts = cleanContacts(
      contacts.reduce((sum, contactArray) => sum.concat(contactArray[0]))
    );

    await campaign.update({
      recipients: cleanedContacts,
      isDraft: false
    });

    // CAMPAIGN MAILER
    const mailer = new Mailer(
      {
        subject: campaign.subject,
        recipients: campaign.recipients
      },
      req.body.html
    );
    mailer.send();
    res.json(campaign);
  } catch (err) {
    console.error("SUBMITTING CAMPAIGNS ERROR", err);
  }
};

exports.getAll = async (req, res) => {
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
};

exports.getOne = async (req, res) => {
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
};
