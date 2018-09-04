const express = require("express");
const chalk = require("chalk");
const findUserById = require("../middlewares/findUserById");
const authCheck = require("../middlewares/authChecker");
const Contacts = require("../db/models").contacts;
const Users = require("../db/models").users;
const Groups = require("../db/models").groups;
const ContactGroups = require("../db/models").ContactGroups;
const {
  fetchGoogleContacts,
  fetchGoogleGroups,
  mapContacts
} = require("../services/sync");

const router = express.Router();
const log = console.log;

router.get("/sync-contacts", authCheck, findUserById, async (req, res) => {
  const userId = req.session.user.toString();

  // FETCH GROUPS
  const groupsResponse = await fetchGoogleGroups();
  const [contactGroups, groupsNextSyncToken] = groupsResponse;

  const mappedGroups = contactGroups.map(group => ({
    UserUuid: userId,
    googleId: group.resourceName.slice(group.resourceName.indexOf("/") + 1),
    title: group.name
  }));

  // BULK CREATE GROUPS
  const createdGroups = await Groups.bulkCreate(mappedGroups, {
    returning: true
  });
  const membershipMap = createdGroups.map(group => group.googleId);
  const memberships = [];
  const contactsResponse = await fetchGoogleContacts();
  const [contacts, contactsNextSyncToken] = contactsResponse;

  try {
    // BULK REATE CONTACT DB ENTRIES
    const mappedContacts = contacts.map(contact =>
      mapContacts(contact, userId)
    );
    const createdContacts = await Contacts.bulkCreate(mappedContacts, {
      returning: true
    });

    // ASSEMBLE ARRAY OF  MEMBERSHIP IDS MAPPINGS TO CONTACT IDS
    createdContacts.map(contact => {
      if (contact.membership) {
        contact.membership.forEach(googleId => {
          memberships.push({
            contactId: contact.id,
            groupId: createdGroups[membershipMap.indexOf(googleId)].id
          });
        });
      }
    });
  } catch (err) {
    console.error(err);
  }

  try {
    // BULK CREATE CONTACT GROUPS DB ENTRIES...
    log(chalk.blue("ADDING GROUP ASSOCIATIONS TO DB"));
    await ContactGroups.bulkCreate(memberships);
  } catch (err) {
    console.error(err);
  }

  try {
    // SET SYNC TOKENS ON USER
    const user = await Users.findById(req.session.user.toString());
    log(chalk.blue("SETTING NEXT SYNC TOKENS ON USER"));
    await user.update({
      gContactsSyncToken: contactsNextSyncToken,
      gGroupsSyncToken: groupsNextSyncToken
    });
  } catch (err) {
    console.error(err);
  }

  try {
    // FETCH CONTACTS ARRAY AND SEND AS REPSONSE
    log(chalk.blue("FETCHING SORTED CONTACTS FROM DB"));
    const results = await Contacts.findAndCountAll({
      limit: 25,
      offset: 0,
      where: {
        UserUuid: userId
      },
      order: [["updatedAt", "ASC"]]
    });
    log(chalk.blue("AUTO-SEQUENCE SYNC COMPLETE!"));
    res.json(results);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
