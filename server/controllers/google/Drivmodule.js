const utils = require('./Oauthmodule');

const { drive } = utils;

const folderName = 'MPP';

const { getValidTokens } = require('../../utills/google.js');
// check the folder is exist

async function iSfolderExist() {
  const tokens = require('../../../token.json');
  const newTokens = await getValidTokens(tokens);
  utils.oAuth2Client.credentials = newTokens;

  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed = false`,
    fields: 'files(id, name)',
  });

  if (res.data.files.length > 0) {
    console.log('folder exist');
    console.log(res.data.files[0].id);
    return res.data.files[0].id;
  }

  console.log("folder  dose't exist");
  console.log(res.data.files);
  return await cReateFolder();
}

async function createSubFolder(folderName, parentId) {
  const folderMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [parentId],
  };
  const res = await drive.files.create({
    resource: folderMetadata,
    fields: 'id,name',
  });
  console.log('Created Sub Folder', folderName, 'parent id : ', parentId);
  console.log(res.data);
}

async function cReateFolder() {
  const tokens = require('../../../token.json');
  const newTokens = await getValidTokens(tokens);
  utils.oAuth2Client.credentials = newTokens;
  console.log('creating the new Foler ');
  // creating folder
  const folderMetadata = {
    name: 'MPP',
    mimeType: 'application/vnd.google-apps.folder',
  };
  const res = await drive.files.create({
    resource: folderMetadata,
    fields: 'id,name',
  });

  await console.log(res);
  await createSubFolder('MyProjects', res.data.id);
  await createSubFolder('SharedProjects', res.data.id);

  console.log(`res.data.id${res.data.id}`);

  return res.data.id;
}

async function sEndFile(fileMetadata, media) {
  const tokens = require('../../../token.json');
  const newTokens = await getValidTokens(tokens);

  utils.oAuth2Client.credentials = newTokens;
  return await drive.files.create(
    {
      resource: fileMetadata,
      media,
      fields: 'id',
    },
    // (err, file) => {
    //   if (err) {
    //     // Handle error
    //     console.error(err);
    //   } else {
    //     fs.unlinkSync(req.file.path)
    //     //console.log(file);
    //     res.render("success", { name: name, pic: pic, success: true })
    //   }

    // }
  );
}

module.exports = { iSfolderExist, sEndFile };
