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
  linkDriveDB,
  updateTokens,
  getTokens,
  getRefreshToken
} = require('../../service/user.js');
const {
  responder
} = require('../../utills/responseHandler.js');
const {
  getListOfFiles,
  getValidTokens
} = require('../../utills/google.js');
const {
  getEmail
} = require('../../utills/utills.js');

const utils = require('./Oauthmodule');
const {
  drive
} = utils;
const driveutils = require('./Drivmodule');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

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
  if (code) {
    utils.oAuth2Client.getToken(code, function (err, tokens) {
      if (err) {
        console.error("Error in authenticating");
      } else {
        let email = "shashank.m19@iiits.in"
        utils.sToreToken(email, tokens);
        utils.oAuth2Client.credentials = (tokens);
        //console.log(tokens);
        return tokens;
      }
    })

    user_email = "shashank.m19@iiits.in"
    let googletokens = await getTokens(user_email);

    console.log(googletokens);
    /* console.log(id_token);
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
       */

    console.log("Fetching id's");
    let fids = await driveutils.iSfolderExist();
    console.log(fids);
    console.log("EMAIL");
    console.log(user_email);
    if(fids){
      await linkDriveDB(user_email, fids);
    }
    console.log("TOKENS");
    console.log(googletokens);
    await updateTokens(user_email, googletokens);

    res.redirect('http://localhost:5000/storyline/new');
  } else {
    return responder(res)(500)
  }
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
  /*let tokens = require('../../../token.json');*/
  /*let email = "shashank.m19@iiits.in";*/
  let email = await getEmail(req, res, next);
  if(!email){
    return res.status(400).send({msg: "Invalid id_token", error: error});
  }
  let tokens = await getTokens(email);
  let refreshToken = await getRefreshToken(email);
  if(!refreshToken){
    return res.status(401).send({msg: "refresh_token not exists in db. Please revoke/link drive access"})
  }
  let fileList = [];
  let newTokens = await getValidTokens(tokens);
  let updateTokenstoDB = await updateTokens(email,newTokens);
  if(!updateTokenstoDB){
    return res.status(401).send({msg: "DB Error : Failed to Update tokens"})
  }
  console.log(email);
  console.log(tokens);
  const access_token = (newTokens.access_token) ? newTokens.access_token : null;

  //const driveIds = await getDriveDetails(email);

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
      console.log("Fetching Files...")
      fileList = response;
    })
    .catch((err) => {
      return res.status(400).send({msg: err.message},err);
    })

  const lists = await getListOfFiles(fileList.items, access_token);
  /*if(!lists){
    return res.status(400).send({msg:"Failed to fetch files"});
  }*/
  return res.status(200).send(lists);
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
