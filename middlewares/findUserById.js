const { oAuth2Client } = require("../services/googleapis");
const Users = require("../db/models").users;

module.exports = async (req, res, next) => {
  try {
    const user = await Users.findById(req.session.user);
    oAuth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken,
      // ms / sec / min / hour / day :: 7 days
      // 1000 * 60 * 60 * 24 * 7
      expiry_date: new Date().getTime() + 1000 * 60 * 60 // 1hr expiry
    });
  } catch (err) {
    res
      .status(404)
      .send({ error: "ERROR FINDING USER AND SETTING CREDENTIALS" });
    console.error(err);
  }
  next();
};
