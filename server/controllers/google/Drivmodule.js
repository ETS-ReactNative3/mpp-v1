const utils = require('./Oauthmodule');

const {drive} = utils;

const folderName = 'MPP';
// check the folder is exist

async function iSfolderExist() {

     console.log("folder")
     utils.oAuth2Client.credentials = 'REPLACE_WITH_TOKENS';
     console.log(utils.oAuth2Client);   

     const res = await drive.files.list(
          {
               q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed = false`,
               fields: 'files(id, name)',
                
          }
           
     );
     
     if(res.data.files.length > 0){
          console.log("folder exist");
          console.log(res.data.files[0].id);
          return res.data.files[0].id;
          
     }
     
          console.log("folder  dose't exist");
          console.log(res.data.files);
           return await cReateFolder();
     

      
}


async function cReateFolder() {
  utils.oAuth2Client.credentials = 'REPLACE_WITH_TOKENS';
  console.log(utils.oAuth2Client);   
  console.log("creating the new Foler ")
  // creating folder
  var folderMetadata = {
    'name': 'MPP',
    'mimeType': 'application/vnd.google-apps.folder',
  };
  const res = await drive.files.create({
    resource: folderMetadata,
    fields: 'id,name'
  });

  console.log(`res.data.id${res.data.id}`);
  return res.data.id;
}

function sEndFile(fileMetadata, media) {
  console.log(utils.oAuth2Client); 
  return drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    }
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
