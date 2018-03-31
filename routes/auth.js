const express = require("express");
const { google } = require("googleapis");
const User = require("../db/models").users;
const { oAuth2Client, url } = require("../services/googleapis");
const authCheck = require("../middlewares/authChecker");
const router = express.Router();
const plus = google.plus("v1");

// GOOGLE LOGIN
router.get("/google", (req, res) => {
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
        (err, response) => {
          const user = response.data;

          // Create new user
          User.findOrCreate({
            where: {
              googleId: user.id,
              email: user.emails[0].value
            },
            defaults: {
              username: user.displayName,
              firstName: user.name.givenName,
              lastName: user.name.familyName,
              googlePhoto: user.image.url,
              googleAccessToken: tokens.access_token,
              googleRefreshToken: tokens.refresh_token
            }
          })
            .spread((user, created) => {
              if (!created) {
                // update auth tokens
                user.update({
                  googleAccessToken: tokens.access_token,
                  googleRefreshToken: tokens.refresh_token
                });
              }

              // Add session obj to req.session.user
              req.session["user"] = user.id;

              // redirect back to app
              // can we setup a proxy w this?
              process.env.NODE_ENV === "production"
                ? res.redirect("/")
                : res.redirect("http://localhost:3000/");
            })
            .catch(err => {
              console.error(err);
            });
        }
      );
    } else {
      res.sendStatus(400);
    }
  });
});

// GET CURRENT USER
router.get("/current-user", authCheck, (req, res) => {
  // console.log(req.session);
  if (req.session.user) {
    User.findById(req.session.user).then(user => {
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
  } else {
    res.json(null);
  }
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;
