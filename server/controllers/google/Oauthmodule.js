const { google } = require('googleapis');
const fs = require('fs');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/userinfo.email',
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);

// If modifying these scopes, delete token.json.

const TOKEN_PATH = 'token.json';

// Generate an OAuth URL and redirect there
function gEtURL() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
}

function oauth2() {
  return google.oauth2({
    auth: oAuth2Client,
    version: 'v2',
  });
}

function sToreToken(token) {
  // Store the token to disk for later program executions
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
    if (err) return console.error(err);
    console.log('Token stored to', TOKEN_PATH);
  });
}

const drive = google.drive({ version: 'v3', auth: oAuth2Client });
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

module.exports = {
  oAuth2Client,
  gEtURL,
  oauth2,
  drive,
  calendar,
  TOKEN_PATH,
  sToreToken,
};
