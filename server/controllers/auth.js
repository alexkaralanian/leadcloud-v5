const { google } = require("googleapis");
const { oAuth2Client, url } = require("../services/googleapis");
const Users = require("../db/models").users;

const plus = google.plus("v1");

exports.googleCallback = (req, res) => {
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
            await user.update({
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
};

exports.login = (req, res) => {
  res.redirect(url);
};

exports.getCurrentUser = async (req, res) => {
  try {
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
  } catch (err) {
    console.error("ERROR", err);
    res.sendStatus(401);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};
