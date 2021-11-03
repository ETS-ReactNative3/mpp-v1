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
  getRefreshToken,
  getDriveDetails
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

  let user_email = "shashank.m19@iiits.in";
  if(!user_email){
    return res.status(400).send({msg: "Invalid id_token", error: error});
  }
  if (code) {
    utils.oAuth2Client.getToken(code, function (err, tokens) {
      if (err) {
        console.error("Error in authenticating");
      } else {
        //let email = "shashank.m19@iiits.in"
        utils.sToreToken(user_email, tokens);
        utils.oAuth2Client.credentials = (tokens);
        //console.log(tokens);
        return tokens;
      }
    })

    let googletokens = await getTokens(user_email);

    console.log("Fetching id's");
    let fids = await driveutils.iSfolderExist();
    console.log(fids);
    console.log("EMAIL");
    console.log(user_email);
    if(fids){
      await linkDriveDB(user_email, fids);
    }
    console.log("TOKENS");
    await updateTokens(user_email, googletokens);

    res.redirect('http://localhost:5000/storyline/new');
  } else {
    return res.status(500).send({msg: 'Internal server error'});
  }
};

const deleteFile = async (req, res, next) => {
  let email = await getEmail(req, res, next);
  if(!email){
    return res.status(400).send({msg: "Invalid id_token", error: error});
  }
  let tokens = await getTokens(email);
  let refreshToken = await getRefreshToken(email);
  if(!refreshToken){
    return res.status(401).send({msg: "refresh_token not exists in db. Please revoke/link drive access"})
  }
  let newTokens = await getValidTokens(tokens,refreshToken);
  let updateTokenstoDB = await updateTokens(email,newTokens);

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
  let email = await getEmail(req, res, next);
  if(!email){
    return res.status(400).send({msg: "Invalid id_token", error: error});
  }
  let tokens = await getTokens(email);
  let refreshToken = await getRefreshToken(email);
  if(!refreshToken){
    return res.status(401).send({msg: "refresh_token not exists in db. Please revoke/link drive access"})
  }
  let newTokens = await getValidTokens(tokens,refreshToken);
  let updateTokenstoDB = await updateTokens(email,newTokens);

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
  let email = await getEmail(req, res, next);
  if(!email){
    return res.status(400).send({msg: "Invalid id_token", error: error});
  }
  let tokens = await getTokens(email);
  let refreshToken = await getRefreshToken(email);
  if(!refreshToken){
    return res.status(401).send({msg: "refresh_token not exists in db. Please revoke/link drive access"})
  }
  let newTokens = await getValidTokens(tokens,refreshToken);
  let updateTokenstoDB = await updateTokens(email,newTokens);

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
  let email = await getEmail(req, res, next);
  if(!email){
    return res.status(400).send({msg: "Invalid id_token"});
  }
  let tokens = await getTokens(email);
  let refreshToken = await getRefreshToken(email);
  if(!refreshToken){
    return res.status(401).send({msg: "refresh_token not exists in db. Please revoke/link drive access"})
  }
  let newTokens = await getValidTokens(tokens,refreshToken);
  let updateTokenstoDB = await updateTokens(email,newTokens);
  const baseDir = path.join(__dirname, '../../storage/temp.json');
  fs.writeFileSync(baseDir, data);

  const driveIds = await getDriveDetails(email);
  if(!driveIds){
    return res.status(401).send({msg: "Drive Not Linked.Plese Link Drive..."})
  }

  //console.log(driveIds.p_fid)

  let file_name;
  console.log("Title : " + req.body.title);
  if(req.body.title === null || req.body.title === undefined || !req.body.title){
    console.log("Title is Null")
    file_name = "story_line.json"
  }
  else{
    file_name = req.body.title;

    if ((/\s/.test(file_name))) {
      console.log("Title contains whitespaces");
      const removeSpaces = file_name.replace(/\s/g, '_');
      file_name = `${removeSpaces}.json`;
    }
    else{
      file_name = `${req.body.title}.json`;
    }
  }

  console.log(file_name);

  try {
    const fileMetadata = {
      name: file_name,
      parents: [driveIds.myp_fid],
    };
    const media = {
      mimeType: 'application/json',
      body: fs.createReadStream(baseDir),
    };
    console.log('Sending file...');
    return await driveutils.sEndFile(res,fileMetadata, media,newTokens);
     
  } catch (error) {
    console.log(error);
    res.status(500).send({msg:"Error Sending File", error : error});
  }
};

const listFiles = async (req, res, next) => {
  let email = await getEmail(req, res, next);
  if(!email){
    return res.status(400).send({msg: "Invalid id_token", error: error});
  }
  let tokens = await getTokens(email);
  let refreshToken = await getRefreshToken(email);
  if(!refreshToken){
    return res.status(401).send({msg: "refresh_token not exists in db. Please revoke/link drive access"})
  }
  let newTokens = await getValidTokens(tokens,refreshToken);
  let updateTokenstoDB = await updateTokens(email,newTokens);

  let fileList = [];

  console.log("Successfully upated tokens to DB...");
  const access_token = (newTokens.access_token) ? newTokens.access_token : null;

  const driveIds = await getDriveDetails(email);
  if(!driveIds){
    return res.status(401).send({msg: "Drive Not Linked.Plese Link Drive..."})
  }

  await fetch(
      `https://www.googleapis.com/drive/v2/files/${driveIds.myp_fid}/children`, {
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