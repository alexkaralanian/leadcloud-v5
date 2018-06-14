const express = require("express");
const { google } = require("googleapis");
const Users = require("../db/models").users;

const { oAuth2Client, url } = require("../services/googleapis");
const authCheck = require("../middlewares/authChecker");

const router = express.Router();
const plus = google.plus("v1");

// GOOGLE LOGIN
router.get("/google", (req, res) => {
  console.log("GOOGLE");
  res.redirect(url);
});

// GOOGLE CALLBACK
router.get("/google/callback", (req, res) => {
  const code = req.query.code;

  oAuth2Client.getToken(code, (err, tokens) => {
    if (!err) {
      oAuth2Client.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: new Date().getTime() + 1000 * 60 * 60 * 24 * 7
      });

      google.options({
        auth: oAuth2Client
      });

      // GET PROFILE ID
      plus.people.get(
        {
          userId: "me"
        },
        async (err, response) => {
          const person = response.data;

          // Create new user
          const User = await Users.findOrCreate({
            where: {
              googleId: person.id,
              email: person.emails[0].value
            },
            defaults: {
              username: person.displayName,
              firstName: person.name.givenName,
              lastName: person.name.familyName,
              googlePhoto: person.image.url,
              googleAccessToken: tokens.access_token,
              googleRefreshToken: tokens.refresh_token
            }
          });
          const [user, created] = User;
          // if user already exists, update auth tokens
          if (!created) {
            user.update({
              googleAccessToken: tokens.access_token,
              googleRefreshToken: tokens.refresh_token
            });
          }
          // Add session obj to req.session.user
          req.session["user"] = user.uuid;

          process.env.NODE_ENV === "production"
            ? res.redirect("/")
            : res.redirect("http://localhost:3000");
        }
      );
    } else {
      res.status(400).send({
        message: "ERROR LOGGIN IN",
        error: err
      });
    }
  });
});

// GET CURRENT USER
router.get("/current-user", authCheck, async (req, res) => {
  const user = await Users.findById(req.session.user);
  const userMap = {
    googleId: user.googleId,
    createdAt: user.createdAt,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    googlePhoto: user.googlePhoto
  };
  res.json(userMap);
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy();
  console.log("LOGOUT SESSION", req.session);
  res.sendStatus(200);
});

module.exports = router;
