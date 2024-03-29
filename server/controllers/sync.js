const chalk = require("chalk");

const Contacts = require("../db/models").contacts;
const Users = require("../db/models").users;
const Groups = require("../db/models").groups;
const ContactGroups = require("../db/models").ContactGroups;
const google = require("../repository/google-people");
const mapGoogleContacts = require("../helpers/google").mapGoogleContacts;

const log = console.log;

exports.googleContacts = async (req, res) => {
  const userId = req.session.user.toString();
  log(chalk.blue("AUTO-SEQUENCE SYNC STARTING"));

  // MAP GOOGLE GROUPS TO DB
  log(chalk.blue("MAPPING GROUPS TO DB"));

  // CALL TO GOOGLE
  const [contactGroups, groupsNextSyncToken] = await google.fetchUserGroups();
  const mappedGroups = contactGroups.map(group => ({
    UserUuid: userId,
    googleId: group.resourceName.slice(group.resourceName.indexOf("/") + 1),
    title: group.name
  }));
  const createdGroups = await Groups.bulkCreate(mappedGroups, {
    returning: true
  });

  // MAP GOOGLE CONTACTS TO DB
  log(chalk.blue("FETCHING GOOGLE CONTACTS"));
  const [contacts, contactsNextSyncToken] = await google.fetchUserContacts();
  const memberships = [];
  try {
    log(chalk.blue("MAPPING CONTACTS TO DB"));
    const mappedContacts = contacts.map(contact => mapGoogleContacts(contact, userId));
    const createdContacts = await Contacts.bulkCreate(mappedContacts, {
      returning: true
    });

    // ASSEMBLE ARRAY OF CONTACT MEMBERSHIP ID MAPPINGS TO CONTACT IDS
    log(chalk.blue("MAPPING MEMBERSHIPS..."));
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
    log(chalk.blue("ADDING MEMBERSHIPS TO DB"));
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
      limit: 20,
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
};
