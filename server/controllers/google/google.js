const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
//var FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {addCredentialsService} = require('../../service/user.js');
const {responder} = require('../../utills/responseHandler.js');
const {getListOfFiles} = require('../../utills/google.js');

const utils = require("./Oauthmodule");
const drive = utils.drive;
const driveutils = require("./Drivmodule");

const CLIENT_ID = '748260318242-5jro895je7hpt6ltocn1jl3r8160kdae.apps.googleusercontent.com';
const CLIENT_SECRET = 'EJuhW9VfLDhnj_La4BRK9jmz';
const REDIRECT_URL = 'http://localhost:5000/api/google/callback';
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/userinfo.email'
];
const TOKEN_PATH = 'token.json';

const refreshToken = async (req, res, next) => {
  try {
    let tokens;
    try {
      tokens = fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return null;
        console.log("hello");
        return (JSON.parse(token));
      });
    } catch (err) {
      console.error(err)
    }
    if(!tokens){ return null; }

    fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'refresh_token': tokens.refresh_token,
        'grant_type': 'refresh_token'
    })
    .then((response) => {
      console.log(response);
      responder (res)(null,response);
    })
    .catch((err) => {
      responder (res)(err,null);
    })
  });
    
  } catch (error) {
     responder(res)(error,null);
  }
}

const linkDrive = async (req, res, next) => {
  try {
    var url = utils.gEtURL();
    res.status(200).send({url : url});
  } catch (error) {
    res.status(400).send({error : ["Error in authenticating OAuth",error]});
  }
}

const callBack = async (req, res, next) => {
  const code = req.query.code;
 if(code){
  utils.oAuth2Client.getToken(code, function(err,tokens){
      if(err){
          console.error("Error in authenticating");
      }
      else {
        let user_email;
          console.log("Successfully authenticated");
          const id_token = tokens.id_token;
          
          const promise1 = new Promise((resolve, reject) => {
            fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
            .then(function(response) {
              return response.json()
            }).then(function(json) {
               resolve(json.email);
            }).catch(function(ex) {
              console.log('parsing failed', ex)
            });
          });

          promise1.then((value) => {
            user_email = value;
            // expected output: "Success!"
          });

          console.log(tokens);

          utils.sToreToken(tokens);
    
          utils.oAuth2Client.credentials = (tokens);

          console.log(utils.oAuth2Client);

          console.log(user_email);

          const promise2 = new Promise((resolve, reject) => {
            resolve(addCredentialsService(tokens,user_email));
          });
        
          

          fs.writeFile(TOKEN_PATH, JSON.parse(tokens), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
      }
  })
 }
 res.redirect('http://localhost:5000/storyline/new');
}

const getFile = async (req, res, next) => {
  utils.oAuth2Client.credentials = {"access_token":"ya29.a0ARrdaM85Eo4PRmRRjY5GfhxIMQXfjC-LuJtdtfWAc-pVwkkXeCM7-6gOmKEcaEqhPmzLU7xnfI5w_4usqwAWadiEA9L7mldwuiu9ZX8l2Y22EivMYsicl7pgxOwclsrTSoQAtuTITrEEs3hzlgS7sDgPaNNr","scope":"openid https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOTI5YzYzZmYxMDgyYmJiOGM5OWY5OTRmYTNmZjRhZGFkYTJkMTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDgyNjAzMTgyNDItNWpybzg5NWplN2hwdDZsdG9jbjFqbDNyODE2MGtkYWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDgyNjAzMTgyNDItNWpybzg5NWplN2hwdDZsdG9jbjFqbDNyODE2MGtkYWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDI5NjY3NTE4OTY0ODY4NjQ3MjAiLCJoZCI6ImlpaXRzLmluIiwiZW1haWwiOiJzaGFzaGFuay5tMTlAaWlpdHMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkRlT1c2bXlGMkprU2lyRnN2T01lM0EiLCJpYXQiOjE2MzM1MzI4NTgsImV4cCI6MTYzMzUzNjQ1OH0.xj9PWvBjt_gxxytBGGjodP5-YWdhKvN5PMXLzbYMD0aojZ8KrFOhbq6W7ZGXJDDZwrFnqcwpzeS-ngAv7J39x1i7_5bpoyOX77T3xcyzwembNMBxbsWL55_eryGLR4RcpOVZc6Jg606kTX_VbyhshPji_fyYYc8ArnbG6VqAl__Mkuij-RoKjxwK3a25e7SOyEegka3vc3pOyxQUDSE-5yjFApGFCUVnVE9h517wM92GO_dm_7M-e6hzhn6PLPeCo20ObYc56nStC4y5rUlDuzqTkRKQxoJKifVSQLf3vj89gy2opX__RRKKXJ7ueCDrIWzqojP81kSEgDeLw7bmNQ","expiry_date":1633536449337}
  console.log(utils.oAuth2Client);
  
  await drive.files.get({
    auth: utils.oAuth2Client,
    fileId: "1ZR8kkvb2JYVxcUjmlgfBJD2IYnisaiFn",
    alt: 'media'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return responder(res)(err,null);
    }
    responder(res)(null,response);
  });
}

const uploadFile = async (req, res, next, data) => {
  let baseDir = path.join(__dirname, '../../storage/temp.json');
  fs.writeFileSync(baseDir, data);
  console.log(data);
  

  try {
    console.log("HI")
    var FID = await driveutils.iSfolderExist();
    console.log("FID" + FID);

    if (FID != '') {
      const fileMetadata = {
        name: 'mpp.json',
        parents: [FID],
      };
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream(baseDir),
      };
      console.log("Sending file...")
      const resdata = driveutils.sEndFile(fileMetadata, media);
      responder(res)(null,resdata);
    }
    
  } catch (error) {
    responder(res)(error,null);
  }
 
  /*
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
  );*/
}

const listFiles = async (req, res, next) => {

  let tokens;
  try {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return console.log(err);
      console.log("hello")
      tokens =  JSON.parse(token);
    });
  } catch (err) {
    console.error(err)
  }
  console.log("hi")
  let fileList = [];
  console.log(tokens);
  let access_token = 'ya29.a0ARrdaM8I-aadt_4hM2TuPPOJL5S4dUkC9oSn8qayV192G3JYbRNwBYN8XZpCgbIwQa4ycW_UDX8TMkC01dFIwuyQ87d4OjPCuZvQDOJVrGFWtLlZjHcRJsc1HSRNsrY179FwQi4wZKXIn7xhwdgIGTO-nMxi';

  await fetch('https://www.googleapis.com/drive/v2/files/1urJh-QUxraU-VXBGI13lpbK9b81crcBP/children', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + `${access_token}` },
  })
  .then((result) => {
    return result.json()
  })
  .then((response) => {
    fileList = response;
  })
  .catch((err) => {
    console.log(err);
  })

  let lists = await getListOfFiles(fileList.items,access_token);

  responder(res)(null,lists);

}

module.exports = {
  uploadFile,
  linkDrive,
  callBack,
  listFiles,
  getFile,
  refreshToken
};
