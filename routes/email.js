const express = require("express");
// const axios = require("axios");
const simpleParser = require("mailparser").simpleParser;
const moment = require("moment");
const { google } = require("googleapis");
const { oAuth2Client } = require("../services/googleapis");
const Users = require("../db/models").users;
// const Contacts = require("../../db/models/contacts");
const emailTransform = require("../services/helperFunctions").emailTransform;

const gmail = google.gmail("v1");
const router = express.Router();

// FETCH ALL EMAILS
router.get("/gmail", (req, res, next) => {
  console.log("session", req.session);
  Users.findById(req.session.user)
    .then(user => {
      oAuth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken,
        expiry_date: new Date().getTime() + 1000 * 60 * 60 * 24 * 7
      });
    })
    .then(() => {
      gmail.users.messages.list(
        {
          userId: "me",
          auth: oAuth2Client,
          maxResults: 15,
          pageToken: req.query.pageToken,
          q: req.query.q
        },
        (err, response) => {
          console.error(err);
          const messageIDs = response.data.messages;
          const nextPageToken = response.data.nextPageToken;

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
                  (error, email) => {
                    if (email) {
                      resolve(email.data);
                    } else {
                      reject(error);
                    }
                  }
                );
              })
          );
          // Resolve array of email promises
          Promise.all(emailPromises)
            .then(values => [nextPageToken, values])
            .then(emails => {
              // Custom helper to transform / map email array
              res.json(emailTransform(emails));
            })
            .catch(error => {
              console.error(error);
              next(error);
            });
        }
      );
    });
});

// /GET SINGLE EMAIL BY ID / VIEW EMAIL MESSAGE
router.get("/gmail/:id", (req, res, next) => {
  Users.findById(req.session.user)
    .then(user => {
      oAuth2Client.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken,
        expiry_date: new Date().getTime() + 1000 * 60 * 60 * 24 * 7
      });
    })
    .then(() => {
      new Promise((resolve, reject) => {
        gmail.users.messages.get(
          {
            userId: "me",
            id: req.params.id,
            format: "raw",
            auth: oAuth2Client
          },
          (error, email) => {
            if (email) {
              resolve(email);
            } else {
              reject(error);
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
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

// // FIND OR CREATE CONTACT BY EMAIL ADDRESS
// router.post("/gmail/fetchcontact", (req, res, next) => {
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
