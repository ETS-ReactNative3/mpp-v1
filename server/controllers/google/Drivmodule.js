const utils = require('./Oauthmodule');

const {
  drive
} = utils;

const folderName = 'MPP';

const {
  getValidTokens
} = require('../../utills/google.js');
const {
  getTokens
} = require('../../service/user.js');
// check the folder is exist

async function iSfolderExist() {
  let email = "shashank.m19@iiits.in";
  let tokens = await getTokens(email);
  let newTokens = await getValidTokens(tokens);
  utils.oAuth2Client.credentials = newTokens;

  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed = false`,
    fields: 'files(id, name)',
  });

  if (res.data.files.length > 0) {
    console.log("folder exist");
    console.log(res.data.files[0].id);
    return null;
  }

  console.log("folder  dose't exist");
  return await cReateFolder();
}

async function createSubFolder(folderName, parentId) {
  var folderMetadata = {
    'name': folderName,
    'mimeType': 'application/vnd.google-apps.folder',
    parents: [parentId],
  };
  const res = await drive.files.create({
    resource: folderMetadata,
    fields: 'id,name'
  });
  console.log("Created Sub Folder", folderName, "parent id : ", parentId);
  return res.data.id;
}


async function cReateFolder() {
  let email = "shashank.m19@iiits.in";
  let tokens = await getTokens(email);
  let newTokens = await getValidTokens(tokens);
  utils.oAuth2Client.credentials = newTokens;
  console.log("creating the new Foler ");
  // creating folder
  var folderMetadata = {
    'name': 'MPP',
    'mimeType': 'application/vnd.google-apps.folder',
  };
  const res = await drive.files.create({
    resource: folderMetadata,
    fields: 'id,name'
  });
  let myprojectsId = await createSubFolder("MyProjects", res.data.id);
  let sharedprojectsId = await createSubFolder("SharedProjects", res.data.id);

  console.log(`res.data.id${res.data.id}`);

  const ids = {
    "parentId": res.data.id,
    "myprojectsId": myprojectsId,
    "sharedprojectsId": sharedprojectsId
  }
  return ids;
}

async function sEndFile(res,fileMetadata, media,newTokens) {

  utils.oAuth2Client.credentials = newTokens;
  return await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
     (err, file) => {
    if (err) {
      console.log(err);
      return res.status(401).send({msg:"Error Sending File", error : error});
     } else {
         //console.log(file);
         return res.status(200).send({msg:"File Successfully sent",file})
      }
     }
  );
}

module.exports = {
  iSfolderExist,
  sEndFile
};
