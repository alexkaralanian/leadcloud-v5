const { google } = require("googleapis");
const moment = require("moment");
const chalk = require("chalk");

const { oAuth2Client } = require("./googleapis");

const people = google.people("v1");
const log = console.log;

const fetchGoogleGroups = syncToken =>
  new Promise((resolve, reject) => {
    const options = {
      auth: oAuth2Client
    };

    if (syncToken) options["syncToken"] = syncToken;

    people.contactGroups.list(options, (err, response) => {
      const { contactGroups, nextSyncToken } = response.data;

      if (response.data) {
        resolve([contactGroups, nextSyncToken]);
      } else {
        reject(err);
      }
    });
  });

const fetchGoogleContacts = syncToken =>
  new Promise((resolve, reject) => {
    let contactsArray = [];

    const recursiveFetchContacts = pageToken => {
      log(chalk.blue("NEXT PAGE TOKEN", pageToken));

      const options = {
        resourceName: "people/me",
        personFields:
          "metadata,names,addresses,emailAddresses,phoneNumbers,memberships,occupations,organizations,photos,birthdays",
        auth: oAuth2Client,
        pageSize: 2000,
        pageToken
      };

      if (syncToken) options["syncToken"] = syncToken;
      if (!syncToken) options["requestSyncToken"] = true;

      people.people.connections.list(options, (err, response) => {
        if (response.data) {
          contactsArray = contactsArray.concat(response.data.connections);
          if (response.data.nextPageToken) {
            recursiveFetchContacts(response.data.nextPageToken);
          } else {
            resolve([contactsArray, response.data.nextSyncToken]);
          }
        } else {
          reject(err);
        }
      });
    };
    recursiveFetchContacts();
  });

// MAP GOOGLE CONTACTS TO DB SCHEMA
const mapContacts = (contact, userId) => {
  const imageArray = contact.photos && contact.photos.map(photo => photo.url);
  const membershipArray =
    contact.memberships &&
    contact.memberships.map(
      group => group.contactGroupMembership.contactGroupId
    );
  return {
    UserUuid: userId,
    googleId: contact.metadata.sources[0].id,
    firstName: contact.names && contact.names[0].givenName,
    lastName: contact.names && contact.names[0].familyName,
    fullName: contact.names && contact.names[0].displayName,
    email: contact.emailAddresses && contact.emailAddresses,
    phone: contact.phoneNumbers && contact.phoneNumbers,
    address: contact.addresses && contact.addresses,
    membership: membershipArray,
    images: imageArray,
    updated: moment(contact.metadata.sources[0].updateTime).format(
      "YYYY-MM-DD HH:mm:ss.SSS"
    )
  };
};

module.exports = {
  fetchGoogleContacts,
  fetchGoogleGroups,
  mapContacts
};
