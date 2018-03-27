"use strict";

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const keys = require("../config/keys")

console.log('KEYS', keys)

const oAuth2Client = new OAuth2(
  keys.GOOGLE_CLIENT_ID,
  keys.GOOGLE_CLIENT_SECRET,
  "http://localhost:3001/api/auth/google/callback"
);

const scopes = [
  "https://mail.google.com/",
  // "https://www.google.com/m8/feeds/",
  "https://www.googleapis.com/auth/contacts",
  "https://www.googleapis.com/auth/calendar",
  "email",
  "profile"
];

const url = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes
});

module.exports = { oAuth2Client, scopes, url };
