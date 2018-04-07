const express = require("express");
const simpleParser = require("mailparser").simpleParser;
const { google } = require("googleapis");
const { oAuth2Client } = require("../services/googleapis");
const Users = require("../db/models").users;
const authCheck = require("../middlewares/authChecker");
const emailTransform = require("../services/emailTransform");
// const moment = require("moment");
// const Contacts = require("../../db/models/contacts");

const gmail = google.gmail("v1");
const router = express.Router();

// FETCH ALL EMAILS
router.get("/gmail", authCheck, async (req, res) => {
  const user = await Users.findById(req.session.user);

  oAuth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
    expiry_date: new Date().getTime() + 1000 * 60 * 60 * 24 * 7
  });

  gmail.users.messages.list(
    {
      userId: "me",
      auth: oAuth2Client,
      maxResults: 15,
      pageToken: req.query.pageToken,
      q: req.query.q
    },
    async (err, response) => {
      const messageIDs = await response.data.messages;
      const nextPageToken = await response.data.nextPageToken;

      // Return an array of email promises
      const emailPromises = messageIDs.map(
        message =>
          new Promise((resolve, reject) => {
            // Fetch individual email messages
            gmail.users.messages.get(
              {
                userId: "me",
                id: message.id,
                format: "metadata",
                auth: oAuth2Client
              },
              async (error, email) => {
                if (email) {
                  await resolve(email.data);
                } else {
                  await reject(error);
                }
              }
            );
          })
      );
      // Resolve array of email promises
      Promise.all(emailPromises).then(values =>
        res.json(emailTransform([nextPageToken, values]))
      );
    }
  );
});

// /GET SINGLE EMAIL BY ID / VIEW EMAIL MESSAGE
router.get("/gmail/:id", authCheck, async (req, res) => {
  const user = await Users.findById(req.session.user);
  oAuth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
    expiry_date: new Date().getTime() + 1000 * 60 * 60 * 24 * 7
  });

  new Promise((resolve, reject) => {
    gmail.users.messages.get(
      {
        userId: "me",
        id: req.params.id,
        format: "raw",
        auth: oAuth2Client
      },
      async (error, email) => {
        if (email) {
          await resolve(email);
        } else {
          await reject(error);
        }
      }
    );
  }).then(response => {
    const body = response.data.raw;
    const buff = Buffer.from(body, "base64").toString("utf8");
    simpleParser(buff).then(results => {
      res.json(results);
    });
  });
});

// // FIND OR CREATE CONTACT BY EMAIL ADDRESS
// router.post("/gmail/fetchcontact", authCheck, (req, res, next) => {
//   // Check to see if contact exists
//   Contacts.findOne({
//     where: {
//       email: {
//         $contains: [
//           {
//             address: req.body.email
//           }
//         ]
//       },
//       UserId: req.session.user.id
//     }
//   })
//     .then(response => {
//       if (response) {
//         // If exists, return response
//         res.json(response);
//       } else if (response === null) {
//         // If does not exist, create
//         Users.findOne({
//           where: {
//             id: req.session.user.id
//           }
//         }).then(authUser => {
//           Contacts.create({
//             email: [
//               {
//                 address: req.body.email,
//                 primary: true,
//                 label: null
//               }
//             ],
//             fullName: req.body.name,
//             phone: [
//               {
//                 $t: null,
//                 label: null
//               }
//             ],
//             updated: moment(Date.now()).toISOString()
//           }).then(createdContact => {
//             createdContact.setUser(authUser);
//             res.sendStatus(200);
//           });
//         });
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       next(error);
//     });
// });

module.exports = router;
