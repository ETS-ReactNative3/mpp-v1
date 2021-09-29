const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const CLIENT_ID = '748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com';
const CLIENT_SECRET = 'EJuhW9VfLDhnj_La4BRK9jmz';
const REDIRECT_URI = 'http://localhost:5000/api/google/callback';
const SCOPES = 'https://www.googleapis.com/auth/drive';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);


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
          oauth2Client.setCredentials(tokens); 
      }
  })
 }
 res.redirect('http://localhost:5000/storyline/new');
}


const uploadFile = async (req, res, next,data) => {

  let baseDir = path.join(__dirname, '../storage/temp.json');
  fs.writeFileSync(baseDir, data);
  
  console.log("Successfully authenticated");

  var fileMetadata = {
      name: 'mpp', // file name that will be saved in google drive
    };
    var media = {
      mimeType: 'plain/text',
      body: fs.createReadStream(baseDir), // Reading the file from our server
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
          console.log(err);
          console.log(err.msg);
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
