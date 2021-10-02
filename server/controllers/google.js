const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
//var FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {addCredentialsService} = require('../service/user.js');
const {responder} = require('../utills/responseHandler.js');

const CLIENT_ID = '748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com';
const CLIENT_SECRET = 'EJuhW9VfLDhnj_La4BRK9jmz';
const REDIRECT_URI = 'http://localhost:5000/api/google/callback';
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/userinfo.email'
];
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const TOKEN_PATH = './token.json';

const drive = google.drive({version: 'v3',oauth2Client });

const linkDrive = async (req, res, next) => {
  try {
    var url = oauth2Client.generateAuthUrl({
      access_type:'offline',
      scope:SCOPES
    });
    res.status(200).send({url : url});
  } catch (error) {
    res.status(400).send({error : ["Error in authenticating OAuth",error]});
  }
}

const callBack = async (req, res, next) => {
  const code = req.query.code;
 if(code){
  oauth2Client.getToken(code, function(err,tokens){
      if(err){
          console.error("Error in authenticating");
      }
      else {
        let user_email;
          console.log("Successfully authenticated");
          const id_token = tokens.id_token;
          fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
          .then(function(response) {
            return response.json()
          }).then(function(json) {
             user_email = json.email;
          }).catch(function(ex) {
            console.log('parsing failed', ex)
          })

          console.log(tokens);

          oauth2Client.setCredentials({
            access_token : tokens.access_token,
            refresh_token : tokens.refresh_token
          });

          const userdata = addCredentialsService(tokens,user_email);
          console.log(userdata);

          fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
      }
  })
 }
 res.redirect('http://localhost:5000/storyline/new');
}


const uploadFile = async (req, res, next,data) => {
  let baseDir = path.join(__dirname, '../storage/temp.json');
  fs.writeFileSync(baseDir, data);

  var fileMetadata = {
    name: 'mpp', // file name that will be saved in google drive
  };
  var media = {
    mimeType: 'plain/text',
    body: fs.createReadStream(baseDir), // Reading the file from our server
  };

  // Uploading Single image to drive

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
    },
    function (err, file){
      if (err) {
        // Handle error
        //console.log(err);
        console.log(err.message);
          fs.unlink(baseDir, (err) => { // we will change it async later
          if (err) {
            throw err;
          }
          console.log('successfully deleted /tmp/hello');
        });
        
        return res
          .status(400)
          .json({ errors: [{ msg: 'Server Error try again later'}] });
      } else {
        console.log("upload success", file.data)
        // if file upload success then return the unique google drive id
        res.status(200).json({
          fileID: file.data.id,
        });
        fs.unlink(baseDir, (err) => { // we will change it async later
          if (err) throw err;
          console.log('successfully deleted /tmp/hello');
        });
      }
    }
  );
}

const listFiles = async (req, res, next) => {

  fetch('https://www.googleapis.com/drive/v2/files/1ZR8kkvb2JYVxcUjmlgfBJD2IYnisaiFn/children', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer' + 'ya29.a0ARrdaM-gxeFTCvwSpl46-HRU4vc-Y846YhDM2isxddE7mhAqC8PONGZVLU729ZG7huZSBRLJaBlLditWO0uIAm-Je4oBBr8t_FkXVv5LuXecabc6GROxrOagavZ1Np7scd4iUwARkwUFUEg6RkQ9g4UbZ06J'
    },
  })
  .then((result) => {
    responder(res)(null, { result });
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  uploadFile,
  linkDrive,
  callBack,
  listFiles
};