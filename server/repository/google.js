const { google } = require("googleapis");
const chalk = require("chalk");

const { oAuth2Client } = require("../services/googleapis");

const people = google.people("v1");
const log = console.log;

exports.fetchUserGroups = syncToken =>
  new Promise((resolve, reject) => {
    const options = {
      auth: oAuth2Client
    };
    if (syncToken) options["syncToken"] = syncToken;
    people.contactGroups.list(options, (err, response) => {
      if (response.data) {
        const { contactGroups, nextSyncToken } = response.data;
        resolve([contactGroups, nextSyncToken]);
      } else {
        reject(err);
      }
    });
  });

exports.fetchUserContacts = syncToken =>
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
      else options["requestSyncToken"] = true;
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
