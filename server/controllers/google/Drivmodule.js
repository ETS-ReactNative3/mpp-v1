const utils = require("./Oauthmodule");


const drive = utils.drive;

const folderName = 'MPP';
//check the folder is exist 

async function iSfolderExist() {

     console.log("folder")
     utils.oAuth2Client.credentials = {"access_token":"ya29.a0ARrdaM8I-aadt_4hM2TuPPOJL5S4dUkC9oSn8qayV192G3JYbRNwBYN8XZpCgbIwQa4ycW_UDX8TMkC01dFIwuyQ87d4OjPCuZvQDOJVrGFWtLlZjHcRJsc1HSRNsrY179FwQi4wZKXIn7xhwdgIGTO-nMxi","scope":"https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/drive.appdata","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOTI5YzYzZmYxMDgyYmJiOGM5OWY5OTRmYTNmZjRhZGFkYTJkMTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDgyNjAzMTgyNDItNWpybzg5NWplN2hwdDZsdG9jbjFqbDNyODE2MGtkYWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDgyNjAzMTgyNDItNWpybzg5NWplN2hwdDZsdG9jbjFqbDNyODE2MGtkYWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDI5NjY3NTE4OTY0ODY4NjQ3MjAiLCJoZCI6ImlpaXRzLmluIiwiZW1haWwiOiJzaGFzaGFuay5tMTlAaWlpdHMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjAzeVh3dTE0YnlsbWxfbEI1cGtWUHciLCJpYXQiOjE2MzM1MzczMTAsImV4cCI6MTYzMzU0MDkxMH0.VLc8DKQOubhhfeR8xmwzEmmH1_ymqABKObtz0BmjRE1zfLb3_HOSTLH5MF7XmDoJVC7m0WqLDKza5qzP4wxN_ieV5l7uFb_8yTrP4oGug_mxsXk6mYosHXmvLEUUbRsgrumm9dYJjf-CeGmlJaEozLaXl-i-r1jZ5n9s4kQK1ZsTjlJ0P_6z7lL9mSSh7ZOCovopZ6FnclyPO3zMlbNlbFTtEkXNvlm7lm4YNwLUXVBGe5nVKe7oQTul9LgbdwwIc8s0xJShIXARrjC0iCukqR1hV_twstJ9jdK4CvZuX4sIKYs1ubU3nVDPOjsLNk-KVodk2Omm6G7lrO1mxUalaA","expiry_date":1633540908331}
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
     else{
          console.log("folder  dose't exist");
          console.log(res.data.files);
           return await cReateFolder();
     }

      
}


async function cReateFolder() {

     utils.oAuth2Client.credentials = {"access_token":"ya29.a0ARrdaM8I-aadt_4hM2TuPPOJL5S4dUkC9oSn8qayV192G3JYbRNwBYN8XZpCgbIwQa4ycW_UDX8TMkC01dFIwuyQ87d4OjPCuZvQDOJVrGFWtLlZjHcRJsc1HSRNsrY179FwQi4wZKXIn7xhwdgIGTO-nMxi","scope":"https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/drive.appdata","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOTI5YzYzZmYxMDgyYmJiOGM5OWY5OTRmYTNmZjRhZGFkYTJkMTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDgyNjAzMTgyNDItNWpybzg5NWplN2hwdDZsdG9jbjFqbDNyODE2MGtkYWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDgyNjAzMTgyNDItNWpybzg5NWplN2hwdDZsdG9jbjFqbDNyODE2MGtkYWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDI5NjY3NTE4OTY0ODY4NjQ3MjAiLCJoZCI6ImlpaXRzLmluIiwiZW1haWwiOiJzaGFzaGFuay5tMTlAaWlpdHMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjAzeVh3dTE0YnlsbWxfbEI1cGtWUHciLCJpYXQiOjE2MzM1MzczMTAsImV4cCI6MTYzMzU0MDkxMH0.VLc8DKQOubhhfeR8xmwzEmmH1_ymqABKObtz0BmjRE1zfLb3_HOSTLH5MF7XmDoJVC7m0WqLDKza5qzP4wxN_ieV5l7uFb_8yTrP4oGug_mxsXk6mYosHXmvLEUUbRsgrumm9dYJjf-CeGmlJaEozLaXl-i-r1jZ5n9s4kQK1ZsTjlJ0P_6z7lL9mSSh7ZOCovopZ6FnclyPO3zMlbNlbFTtEkXNvlm7lm4YNwLUXVBGe5nVKe7oQTul9LgbdwwIc8s0xJShIXARrjC0iCukqR1hV_twstJ9jdK4CvZuX4sIKYs1ubU3nVDPOjsLNk-KVodk2Omm6G7lrO1mxUalaA","expiry_date":1633540908331}
     console.log(utils.oAuth2Client);   
     console.log("creating the new Foler ")
     //creating folder
     var folderMetadata = {
          'name': 'MPP',
          'mimeType': 'application/vnd.google-apps.folder',

     };
     const res = await drive.files.create({
          resource: folderMetadata,
          fields: 'id,name'
     });

     console.log("res.data.id"+res.data.id);
     return res.data.id;


}


function sEndFile(fileMetadata,media){
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


module.exports = {iSfolderExist, sEndFile};
