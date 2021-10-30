const {
  google
} = require('googleapis');
const path = require('path');
const fs = require('fs');
const stream = require('stream');
// var FormData = require('form-data');
const fetch = (...args) =>
  import('node-fetch').then(({
    default: fetch
  }) => fetch(...args));
const {
  linkDriveDB
} = require('../../service/user.js');
const {
  responder
} = require('../../utills/responseHandler.js');
const {
  getListOfFiles,
  getValidTokens
} = require('../../utills/google.js');

const utils = require('./Oauthmodule');
const {
  drive
} = utils;
const driveutils = require('./Drivmodule');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const TOKEN_PATH = 'token.json';

const refreshToken = async (req, res, next) => {
  try {
    await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          grant_type: 'refresh_token',
        })
      })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch((error) => {
        return null;
      });

  } catch (error) {
    return null;
  }
};

const linkDrive = async (req, res, next) => {
  try {
    let url = utils.gEtURL();
    res.status(200).send({
      url: url
    });
  } catch (error) {
    res.status(400).send({
      error: ['Error in authenticating OAuth', error]
    });
  }
};

const callBack = async (req, res, next) => {
  const {
    code
  } = req.query;
  let user_email;
  let id_token;
  if (code) {
    try {
      let tokens_res = await utils.oAuth2Client.getToken(code)
      utils.sToreToken(tokens_res.tokens);
      utils.oAuth2Client.credentials = (tokens_res.tokens);
      console.log(tokens_res.tokens)
      id_token = tokens_res.tokens.id_token;
    } catch (error) {
      console.log(error);
    }
  
    console.log(id_token);
    console.log(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
    user_email = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json.email;
      })
      .catch(error => {
        console.log(error);
      });

  } else {
    return responder(res)(500)
  }
  console.log("Fetching id's");
  let fids = await driveutils.iSfolderExist();
  console.log(fids);
  console.log("EMAIL");
  console.log(user_email);
  await linkDriveDB(user_email, fids);
  res.redirect('http://localhost:5000/storyline/new');
};

const deleteFile = async (req, res, next) => {
  let tokens = require('../../../token.json');
  let newTokens = await getValidTokens(tokens);
  utils.oAuth2Client.credentials = newTokens;

  await drive.files.delete({
      auth: utils.oAuth2Client,
      fileId: req.params.id,
    },
    function (err, response) {
      if (err) {
        console.log(`The API returned an error: ${  err}`);
        return responder(res)(err, null);
      }
      responder(res)(null, response);
    },
  );
};

const updateFile = async (req, res, next) => {
  let tokens = require('../../../token.json');
  let newTokens = await getValidTokens(tokens);
  utils.oAuth2Client.credentials = newTokens;
  await drive.files.get({
    auth: utils.oAuth2Client,
    fileId: req.params.id,
    media: media,
  }, (err, response) => {
    if (err) {
      console.log(err);
      responder(400)(err, null);
    }
    console.log(response.data)
    responder(res)(null, response.data);
  });
};

const getFile = async (req, res, next) => {
  let tokens = require('../../../token.json');
  utils.oAuth2Client.credentials = tokens;
  let newTokens = await getValidTokens(tokens);
  await fetch(
      `https://www.googleapis.com/drive/v2/files/${req.params.id}?alt=media&source=downloadUrl`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + `${newTokens.access_token}`,
        },
      },
    )
    .then((result) => result.json())
    .then((response) => {
      responder(res)(null, response);
    })
    .catch((err) => {
      responder(res)(err, null);
    })
};

const uploadFile = async (req, res, next, data) => {
  const baseDir = path.join(__dirname, '../../storage/temp.json');
  fs.writeFileSync(baseDir, data);

  try {
    const fileMetadata = {
      name: 'mpp.json',
      parents: ["1urJh-QUxraU-VXBGI13lpbK9b81crcBP"],
    };
    const media = {
      mimeType: 'application/json',
      body: fs.createReadStream(baseDir),
    };
    console.log('Sending file...');
    const resdata = await driveutils.sEndFile(fileMetadata, media);
    responder(res)(null, resdata);
  } catch (error) {
    console.log(error);
    responder(res)(error, null);
  }
};

const listFiles = async (req, res, next) => {
  let tokens = require('../../../token.json');
  let fileList = [];
  let newTokens = await getValidTokens(tokens);

  const access_token = (newTokens.access_token) ? newTokens.access_token : null;

  await fetch(
      'https://www.googleapis.com/drive/v2/files/1fkPN96QOmCvLNkR7Puw7vqkwhsstsGop/children', {
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
  updateFile,
  deleteFile
};
