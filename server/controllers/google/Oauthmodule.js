const { google } = require('googleapis');
const fs = require('fs');
const { updateTokens } = require('../../service/user.js');

const { CLIENT_ID } = process.env;
const { CLIENT_SECRET } = process.env;
const REDIRECT_URL = 'http://localhost:5000/api/google/callback';
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/userinfo.email',
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);

// Generate an OAuth URL and redirect there
function getURL() {
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

async function storeToken(email, token) {
  // Store the token to disk for later program executions
  await updateTokens(email, token);
  /* fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
    if (err)
      return console.error(err);
    console.log('Token stored to', TOKEN_PATH);
  }); */
}

const drive = google.drive({ version: 'v3', auth: oAuth2Client });
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

module.exports = {
  oAuth2Client,
  getURL,
  oauth2,
  drive,
  calendar,
  storeToken,
};
