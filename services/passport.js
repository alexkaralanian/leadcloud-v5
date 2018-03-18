"use strict";

const passport = require("passport");
const refresh = require("passport-oauth2-refresh");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../db/models").users;
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (user) {
        user = user.dataValues;
        const userMap = {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          googleId: user.googleId,
          googlePhoto: user.googlePhoto
        };
        done(null, userMap);
      }
    })
    .catch(err => {
      done(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/authp/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      const defaults = {
        username: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        googlePhoto: profile.photos && profile.photos[0].value,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken
      };

      // FindOrCreate returns a newly created user or the existing user
      // Created returns a boolean indicating whether user is new or not.
      User.findOrCreate({
        where: {
          googleId: profile.id
        },
        defaults
      })
        .spread((user, created) => {
          if (!created) {
            user.update({
              googleAccessToken: accessToken,
              googleRefreshToken: refreshToken
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

// refresh.use(googleStrategy);
