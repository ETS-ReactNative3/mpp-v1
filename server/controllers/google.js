const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
var FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const CLIENT_ID = '748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com';
const CLIENT_SECRET = 'EJuhW9VfLDhnj_La4BRK9jmz';
const REDIRECT_URI = 'http://localhost:5000/api/google/callback';
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.appdata',
];
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const TOKEN_PATH = './token.json';

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
          console.log("Successfully authenticated");
          console.log(tokens);
          oauth2Client.setCredentials({
            access_token : tokens.access_token,
            refresh_token : tokens.refresh_token
          });
          console.log(oauth2Client);
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

  oauth2Client.setCredentials({
    access_token : 'ya29.a0ARrdaM-kSu1W5ZvHs9DVm13a9dKpscHOhQgWXspFU8xxdFL5mKcQueQqVqlQwZuWexhEq6Gf_I3hD2e_OAHmQUxDqKZ6k-37pSVQtN3QIy_W9wQsjmMr29fsGJ69LDTaD2cAdVrni7vSol7OP62n6whQMYuD',
    refresh_token : '1//0gqqD2AdJigwbCgYIARAAGBASNwF-L9Irve3LMSFVs2zYRYJ5MV1Yfi7JwXyHQZPBl8wx-0iraGJvbgDh-iSoik8EpryUsQQRux8'
  });
  console.log('In Middle');
  console.log(oauth2Client);

  var fileMetadata = {
    name: 'mpp', // file name that will be saved in google drive
  };
  var media = {
    mimeType: 'plain/text',
    body: fs.createReadStream(baseDir), // Reading the file from our server
  };

  // Uploading Single image to drive
  const drive = google.drive({version: 'v3',oauth2Client });

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

module.exports = {
  uploadFile,
  linkDrive,
  callBack
};

/*

  fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ `${access_token}`, 
    },
    body: form
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
 




 
  var fileMetadata = {
    'name': 'mpp'
  };
  var media = {
    mimeType: 'text/plain',
    body: fs.createReadStream(baseDir)
  };
  drive.files.create({
    resource: fileMetadata,
    media: media
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err.message);
    } else {
      console.log('File Id: ', file.id);
    }
  });
*/
