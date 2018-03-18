const passport = require("passport");
const refresh = require("passport-oauth2-refresh");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../db/models").users;
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log('DESERIALIZE CALLED', user)
  User.findById(id)
    .then(user => {
      if (user) done(null, user);
      // else done(null, null);
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

      User.findOrCreate({
        where: {
          googleId: profile.id
        },
        defaults
      })
        .spread(user => {
          if (user) return done(null, user);
          else return done(null, false);
        })
        .catch(done);
    }
  )
);

// refresh.use(googleStrategy);
