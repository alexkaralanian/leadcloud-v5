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

  log(chalk.blue("AUTO-SEQUENCE SYNC STARTING..."));

  // MAP GOOGLE GROUPS TO DB
  log(chalk.blue("MAPPING GROUPS TO DB..."));

  const [contactGroups, groupsNextSyncToken] = await fetchGoogleGroups();

  const mappedGroups = contactGroups.map(group => ({
    UserUuid: userId,
    googleId: group.resourceName.slice(group.resourceName.indexOf("/") + 1),
    title: group.name
  }));

  const createdGroups = await Groups.bulkCreate(mappedGroups, {
    returning: true
  });

  // MAP GOOGLE CONTACTS TO DB
  log(chalk.blue("MAPPING CONTACTS TO DB..."));

  const [contacts, contactsNextSyncToken] = await fetchGoogleContacts();

  const memberships = [];

  try {
    const mappedContacts = contacts.map(contact =>
      mapContacts(contact, userId)
    );
    const createdContacts = await Contacts.bulkCreate(mappedContacts, {
      returning: true
    });

    // ASSEMBLE ARRAY OF CONTACT MEMBERSHIP ID MAPPINGS TO CONTACT IDS
    const membershipMap = createdGroups.map(group => group.googleId);

    createdContacts.map(contact => {
      if (contact.membership) {
        contact.membership.forEach(googleId => {
          memberships.push({
            contactId: contact.id,
            // 1:1 object mapping for optimal efficiency
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
    log(chalk.blue("SETTING NEXT SYNC TOKENS ON USER"));

    const user = await Users.findById(req.session.user.toString());
    await user.update({
      gContactsSyncToken: contactsNextSyncToken,
      gGroupsSyncToken: groupsNextSyncToken
    });
  } catch (err) {
    console.error(err);
  }

  try {
    // FETCH SORTED CONTACTS ARRAY AND SEND AS REPSONSE
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
