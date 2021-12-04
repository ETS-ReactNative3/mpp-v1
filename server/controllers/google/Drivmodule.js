const utils = require('./Oauthmodule');

const {
  drive
} = utils;

const folderName = 'MPP';



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
  console.log("Created Sub Folder", folderName);
  return res.data.id;
}

// check the folder is exist

async function isFolderExist(tokens) {

  utils.oAuth2Client.credentials = tokens;

  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed = false`,
    fields: 'files(id, name)',
  });

  if (res.data.files.length > 0) {
    console.log("folder exist");
    //console.log(res.data.files[0].id);
    let myprojectsId;
    let sharedprojectsId;

    const myp_res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='MyProjects' and trashed = false`,
      fields: 'files(id, name)',
    });

    if(myp_res.data.files.length > 0){
      myprojectsId =   myp_res.data.files[0].id ;
    }
    else {
      myprojectsId = await createSubFolder("MyProjects", res.data.files[0].id);
    }

      const sp_res = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='MyProjects' and trashed = false`,
        fields: 'files(id, name)',
      });

      if(sp_res.data.files.length > 0){
        sharedprojectsId =   sp_res.data.files[0].id ;
      }
      else {
        sharedprojectsId = await createSubFolder("SharedProjects", res.data.files[0].id);
      }


      const ids = {
        "parentId": res.data.files[0].id,
        "myprojectsId": myprojectsId,
        "sharedprojectsId": sharedprojectsId
      }
    return ids;
  }

  console.log("folder  dose't exist");
  return await createFolder(tokens);
}

async function createFolder(tokens) {
  utils.oAuth2Client.credentials = tokens;
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

  //console.log(`res.data.id${res.data.id}`);

  const ids = {
    "parentId": res.data.id,
    "myprojectsId": myprojectsId,
    "sharedprojectsId": sharedprojectsId
  }
  return ids;
}

async function sendFile(res,fileMetadata, media,newTokens) {

  utils.oAuth2Client.credentials = newTokens;
  return await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
     (err, file) => {
    if (err) {
      //console.log(err);
      console.log("! Error Sending File")
      return res.status(404).send({msg:"Error Sending File", error : err});
     } else {
         //console.log(file);
         console.log("File Successfully sent")
         return res.status(200).send({msg:"File Successfully sent",file})
      }
     }
  );
}

module.exports = {
  isFolderExist,
  sendFile
};
