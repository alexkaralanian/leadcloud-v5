const { google } = require("googleapis");
const chalk = require("chalk");
const { oAuth2Client } = require("../services/googleapis");
const googleCal = google.calendar("v3");
const log = console.log;

// console.log("GOOGLE CAL", googleCal);
// console.log("OAUTH2 CLIENT", oAuth2Client);

// const axios = require("axios");

exports.fetchUserEvents = async (req, res) => {
  console.log("FETCH USER EVENTS");
  // const response = axios.get("https://www.googleapis.com/calendar/v3/users/me/calendarList");
  new Promise((resolve, reject) => {
    const options = {
      userId: "me",
      auth: oAuth2Client
    };

    googleCal.calendarList.list(options, (err, response) => {
      console.log("REPO RESPONSE", { response: response.data.items, err });
      if (response.data) {
        resolve(response.data.items);
      } else {
        reject(err);
      }
    });
  });

  // console.log("RESPONSE", response);
  // res.json("HI");
  // googleCal.calendarList.list(
  //   {
  //     // userId: "me",
  //     auth: oAuth2Client
  //     // maxResults: req.query.maxResults,
  //     // pageToken: req.query.pageToken,
  //     // q: req.query.q
  //   },
  //   (err, response) => {
  //     console.log("GAL", { response, err });
  //     // return response;
  //     res.json("hi");
  //   }
  // );
};

// promisify?

// exports.fetchUserGroups = syncToken =>
//   new Promise((resolve, reject) => {
//     const options = {
//       auth: oAuth2Client
//     };
//     if (syncToken) options.syncToken = syncToken;
//     people.contactGroups.list(options, (err, response) => {
//       if (response.data) {
//         const { contactGroups, nextSyncToken } = response.data;
//         resolve([contactGroups, nextSyncToken]);
//       } else {
//         reject(err);
//       }
//     });
//   });
