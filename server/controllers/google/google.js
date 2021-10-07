const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
// var FormData = require('form-data');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { addCredentialsService } = require('../../service/user.js');
const { responder } = require('../../utills/responseHandler.js');
const { getListOfFiles } = require('../../utills/google.js');

const utils = require('./Oauthmodule');
const {drive} = utils;
const driveutils = require('./Drivmodule');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const TOKEN_PATH = 'token.json';

const refreshToken = async (req, res, next) => {
  try {
    let tokens;
    try {
      tokens = fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return null;
        console.log('hello');
        return JSON.parse(token);
      });
    } catch (err) {
      console.error(err);
    }
    if (!tokens) {
      return null;
    }

    fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: tokens.refresh_token,
        grant_type: 'refresh_token',
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
};

const linkDrive = async (req, res, next) => {
  try {
    let url = utils.gEtURL();
    res.status(200).send({ url: url });
  } catch (error) {
    res.status(400).send({ error: ['Error in authenticating OAuth', error] });
  }
};

const callBack = async (req, res, next) => {
  const {code} = req.query;
  if(code){
    utils.oAuth2Client.getToken(code, function(err,tokens){
      if (err) {
        console.error("Error in authenticating");
      } else {
        let user_email;
        console.log("Successfully authenticated");
        const {id_token} = tokens;

        const promise1 = new Promise((resolve, reject) => {
          fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
            .then(function(response) {
              return response.json();
            })
            .then(function(json) {
              resolve(json.email);
            })
            .catch(function(ex) {
              console.log('parsing failed', ex);
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

        fs.writeFile(TOKEN_PATH, JSON.parse(tokens), err => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
      }
    })
  }
  res.redirect('http://localhost:5000/storyline/new');
};

const getFile = async (req, res, next) => {
  utils.oAuth2Client.credentials = 'REPLACE_WITH_TOKENS'
  console.log(utils.oAuth2Client);

  await drive.files.get(
    {
      auth: utils.oAuth2Client,
      fileId: '1ZR8kkvb2JYVxcUjmlgfBJD2IYnisaiFn',
      alt: 'media',
    },
    function(err, response) {
      if (err) {
        console.log(`The API returned an error: ${  err}`);
        return responder(res)(err, null);
      }
      responder(res)(null, response);
    },
  );
};

const uploadFile = async (req, res, next, data) => {
  const baseDir = path.join(__dirname, '../../storage/temp.json');
  fs.writeFileSync(baseDir, data);
  console.log(data);

  try {
    console.log('HI');
    let FID = await driveutils.iSfolderExist();
    console.log('FID' + FID);

    if (FID != '') {
      const fileMetadata = {
        name: 'mpp.json',
        parents: [FID],
      };
      const media = {
        mimeType: 'application/json',
        body: fs.createReadStream(baseDir),
      };
      console.log('Sending file...');
      const resdata = driveutils.sEndFile(fileMetadata, media);
      responder(res)(null, resdata);
    }
  } catch (error) {
    responder(res)(error, null);
  }
};

const listFiles = async (req, res, next) => {
  let tokens;
  try {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return console.log(err);
      console.log('hello');
      tokens = JSON.parse(token);
    });
  } catch (err) {
    console.error(err);
  }
  console.log('hi');
  let fileList = [];
  console.log(tokens);
  const access_token ='REPLACE_WITH_ACCESS_TOKEN';

  await fetch(
    'https://www.googleapis.com/drive/v2/files/1urJh-QUxraU-VXBGI13lpbK9b81crcBP/children',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${access_token}`,
      },
    },
  )
    .then((result) => result.json())
    .then((response) => {
      fileList = response;
    })
    .catch((err) => {
      console.log(err);
    })

  const lists = await getListOfFiles(fileList.items, access_token);

  responder(res)(null, lists);
};

module.exports = {
  uploadFile,
  linkDrive,
  callBack,
  listFiles,
  getFile,
  refreshToken,
};
