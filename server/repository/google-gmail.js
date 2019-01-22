const { google } = require("googleapis");
const simpleParser = require("mailparser").simpleParser;
const { oAuth2Client } = require("../services/googleapis");
const emailTransform = require("../helpers/email").transform;

const gmail = google.gmail("v1");

exports.fetchUserEmails = (req, res) => {
  gmail.users.messages.list(
    {
      userId: "me",
      auth: oAuth2Client,
      // maxResults: req.query.maxResults,
      pageToken: req.query.pageToken,
      q: req.query.q
    },
    (err, response) => {
      if (!err) {
        if (response.data.resultSizeEstimate > 0) {
          const resultSizeEstimate = response.data.resultSizeEstimate;
          console.log("resultSizeEstimate", resultSizeEstimate);
          const messageIDs = response.data.messages;
          console.log("messageIDs", messageIDs);
          const nextPageToken = response.data.nextPageToken || "";
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
                      // console.log("EMAIL DATA", email.data);
                      resolve(email.data);
                    } else {
                      reject(error);
                    }
                  }
                );
              })
          );
          // Resolve all email promises
          Promise.all(emailPromises)
            .then(values => [nextPageToken, values])
            .then(emails => {
              // Custom helper to transform / map email array
              res.json(emailTransform(emails));
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          res.json([]);
        }
      } else {
        console.error("ERROR FETCHING EMAILS", err.response);
        res.status(err.response.status).send(err.response.data);
      }
    }
  );
};

exports.fetchMessage = async (req, res) => {
  try {
    const response = await new Promise((resolve, reject) => {
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
    });
    const body = response.data.raw;
    const buff = Buffer.from(body, "base64").toString("utf8");
    const email = await simpleParser(buff);
    res.json(email);
  } catch (err) {
    console.error("ERROR FETCHING EMAIL", err.response.data);
  }
};

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
