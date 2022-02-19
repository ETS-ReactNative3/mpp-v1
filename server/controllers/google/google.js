const path = require('path');
const fs = require('fs');
const stream = require('stream');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const {
  linkDriveDB,
  updateTokens,
  getTokens,
  getRefreshToken,
  getDriveDetails,
} = require('../../service/user.js');

const {
  getListOfFiles,
  getValidTokens,
  getFileList,
} = require('../../utills/google.js');
const { getEmail, getEmailWithId } = require('../../utills/utills.js');
const { validateAccess } = require('../../utills/manageTokens.js');

const utils = require('./Oauthmodule');
const { drive } = utils;
const driveutils = require('./Drivmodule');

const linkDrive = async (req, res, next) => {
  try {
    const url = utils.getURL();
    res.status(200).send({
      url,
    });
  } catch (error) {
    res.status(400).send({
      error: ['Error in authenticating OAuth', error],
    });
  }
};

const callBack = async (req, res, next) => {
  const { code } = req.query;

  if (code) {
    let user_email;
    try {
      const currTokens = await utils.oAuth2Client.getToken(code);

      const { tokens } = currTokens;

      user_email = await getEmailWithId(tokens.id_token);

      await utils.storeToken(user_email, tokens);

      utils.oAuth2Client.credentials = tokens;
    } catch (error) {
      return res.status(500).send({
        msg: 'Error In Authentication',
      });
    }

    console.log('Successfully authenticated');

    if (!user_email) {
      return res.status(400).send({
        msg: 'Invalid id_token',
      });
    }

    const googletokens = await getTokens(user_email);

    console.log("Fetching id's");
    console.log(`Email = ${user_email}`);
    const fids = await driveutils.isFolderExist(googletokens);

    if (fids) {
      await linkDriveDB(user_email, fids);
    }

    await updateTokens(user_email, googletokens);

    res.redirect(
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_REDIRECT_URL_UI
        : process.env.REDIRECT_URL_UI,
    );
  } else {
    return res.status(500).send({
      msg: 'Internal server error',
    });
  }
};

const deleteFile = async (req, res, next) => {
  const { email, newTokens , error} = await validateAccess(req, res, next);

  if(!email || !newTokens) {
    return res.status(401).send({msg : error });
  }

  utils.oAuth2Client.credentials = newTokens;
  drive.files.delete(
    {
      auth: utils.oAuth2Client,
      fileId: req.params.id,
    },
    function(err, response) {
      if (err) {
        console.log(`The API returned an error: ${err}`);
        return res.status(401).send({
          error: err,
        });
      }
      return res.status(200).send({
        msg: 'Deleted file successfully',
        response,
      });
    },
  );
};

const updateFile = async (req, res, next) => {
  const { email, newTokens ,error} = await validateAccess(req, res, next);

  if(!email || !newTokens) {
    return res.status(401).send({msg : error });
  }

  utils.oAuth2Client.credentials = newTokens;
  const content = JSON.stringify(req.body);
  const buf = Buffer.from(content, 'binary');
  const buffer = Uint8Array.from(buf);
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);
  const media = {
    mimeType: 'application/json',
    body: bufferStream,
  };
  const file_name = req.body.title
    ? `${req.body.title.replace(/\s/g, '_')}.json`
    : 'story_line.json';
  drive.files.update(
    {
      auth: utils.oAuth2Client,
      fileId: req.params.id,
      media,
      resource: { name: file_name },
    },
    (err, response) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          error: err,
        });
      }
      return res.status(200).send({
        msg: 'Updated file successfully',
        response,
      });
    },
  );
};

const getFile = async (req, res, next) => {
  const { email, newTokens , error } = await validateAccess(req, res, next);

  if(!email || !newTokens) {
    return res.status(401).send({msg : error });
  }

  await fetch(
    `https://www.googleapis.com/drive/v2/files/${req.params.id}?alt=media&source=downloadUrl`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${newTokens.access_token}`,
      },
    },
  )
    .then(result => {return result.json()})
    .then(response =>
      res.status(200).send({
        response,
      }),
    )
    .catch(err =>
      res.status(401).send({
        error: err,
      }),
    );
};

const uploadFile = async (req, res, next, data) => {
  const {email,newTokens,error} = await validateAccess(req, res, next);
  if(!email || !newTokens) {
    return res.status(401).send({msg : error });
  }

  const driveIds = await getDriveDetails(email);
  if (!driveIds || !email || !newTokens) {
    return res.status(401).send({
      msg: 'Drive Not Linked.Plese Link Drive...',
    });
  }
  const baseDir = path.join(__dirname, '../../storage/temp.json');
  fs.writeFileSync(baseDir, data);

  // console.log(driveIds.p_fid)

  const file_name = req.body.title
    ? `${req.body.title.replace(/\s/g, '_')}.json`
    : 'story_line.json';
  console.log(`Title : ${req.body.title}`);

  console.log(file_name);
  // console.log("file to be saved at id : " + driveIds.myp_fid);
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
    return await driveutils.sendFile(res, fileMetadata, media, newTokens);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'Error Sending File',
      error,
    });
  }
};

const listFiles = async (req, res, next) => {
 
  const {email,newTokens,error} = await validateAccess(req, res, next);
  if(!email || !newTokens) {
    return res.status(401).send({msg : error });
  }
  const driveIds = await getDriveDetails(email);
  if (!driveIds || !email || !newTokens) {
    return res.status(403).send({
      msg: "Drive Not Linked.Plese Link Drive..."
    })
  }
  
  let fileList = [];

  console.log('Successfully upated tokens to DB...');
  const access_token = newTokens.access_token ? newTokens.access_token : null;

  fileList = await getFileList(access_token, driveIds);

  if(!access_token || !fileList){
    return res.status(401).send({
      msg: "Drive Not Linked Properly/Refresh Token Expired.Please link drive again."
    })
  }

  const lists = await getListOfFiles(fileList.items, access_token);

  return res.status(200).send(lists);
};

module.exports = {
  uploadFile,
  linkDrive,
  callBack,
  listFiles,
  getFile,
  updateFile,
  deleteFile,
};
