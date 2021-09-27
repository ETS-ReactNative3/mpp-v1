const { google } = require('googleapis');
var Blob = require('node-blob');
var FormData = require('form-data');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com';
const CLIENT_SECRET = 'EJuhW9VfLDhnj_La4BRK9jmz';
const REDIRECT_URI = 'http://localhost:3000/api/google/callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const uploadFile = async (req, res, next) => {
    const code = req.query.code;
    const fileData = JSON.stringify(req.query.filedata);
    console.log(req.query);
    console.log(fileData);

   if(code){
    oauth2Client.getToken(code, function(err,tokens){
        if(err){
            console.error("Error in authenticating");
        }
        else {
            console.log("Successfully authenticated");

            oauth2Client.setCredentials(tokens);

            var fileMetadata = {
                name: 'mpp', // file name that will be saved in google drive
              };
            
              var media = {
                mimeType: 'plain/text',
                body: fs.createReadStream('../storage/mpp.txt'), // Reading the file from our server
              };
            
              // Authenticating drive API
              const drive = google.drive({ version: 'v3', oauth2Client });
            
              // Uploading Single image to drive
              drive.files.create(
                {
                  resource: fileMetadata,
                  media: media,
                },
                async (err, file) => {
                  if (err) {
                    // Handle error
                    console.error(err.msg);
            
                    return res
                      .status(400)
                      .json({ errors: [{ msg: 'Server Error try again later' }] });
                  } else {
                    // if file upload success then return the unique google drive id
                    res.status(200).json({
                      fileID: file.data.id,
                    });
                  }
                }
              );

            
        }
    })
   }
}

module.exports = uploadFile;
