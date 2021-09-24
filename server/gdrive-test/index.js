const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com';
const CLIENT_SECRET = 'EJuhW9VfLDhnj_La4BRK9jmz';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04rJ7gKCAMSClCgYIARAAGAQSNwF-L9IrbkVfYDBYqil3lTJxbGH8MiOWxCldelpJ_LaNsrPEEIFZ2LfUI-KQbzJa2dKf85Z9lGQ';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
const filePath = path.join(__dirname, 'temp.txt');

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'temp.txt', //This can be name of your choice
        mimeType: 'text/plain',
      },
      media: {
        mimeType: 'text/plain',
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

uploadFile();
