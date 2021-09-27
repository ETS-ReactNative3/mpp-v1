const storyUtills = require('../utills/storyline.js');
var querystring = require('querystring');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com';
const CLIENT_SECRET = 'EJuhW9VfLDhnj_La4BRK9jmz';
const REDIRECT_URI = 'http://localhost:3000/api/google/callback';

const REFRESH_TOKEN = '1//04rJ7gKCAMSClCgYIARAAGAQSNwF-L9IrbkVfYDBYqil3lTJxbGH8MiOWxCldelpJ_LaNsrPEEIFZ2LfUI-KQbzJa2dKf85Z9lGQ';

const SCOPES = 'https://www.googleapis.com/auth/drive'
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);


const storySave = async (req, res, next) => {
    const story = JSON.parse(JSON.stringify(req.body));
    const fileData = (
        "Logline \n\n" +
       /* "Character : " + story.logline.character + "\n" + 
        "Crisis : " + story.logline.crisis + "\n" + "" +
        "Response : " + story.logline.response + "\n" +*/
        "Theme : " + story.theme + "\n" +
        "Sub-Genre : " + story.subGenre + "\n" +
        "Title : " + story.title + "\n" 
    )
    //console.log(fileData);
    var url = oauth2Client.generateAuthUrl({
      access_type:'offline',
      scope:SCOPES
    })
    console.log(url);
}

module.exports = storySave;
