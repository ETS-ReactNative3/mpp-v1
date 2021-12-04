const User = require('../db/user.js');

const loginUserService = async (email,req) => {
  const currUser = await User.findOne({
    email: email
  });
  if(!currUser){
    var new_user = new User(req.body)
    const savedUser = await new_user.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        return result;
      }
    })
    return savedUser;
  }
  return currUser;
};

// Google Drive Services
const linkDriveDB = async (email, newData) => {
  const currUser = await User.findOne({
    email: email
  });
  if(!currUser){
    return null;
  }

  const updateUser = await User.updateOne({
    email: email
  }, {
    DriveAPI: {
      parentId: newData.parentId,
      myprojectsId: newData.myprojectsId,
      sharedprojectsId: newData.sharedprojectsId,
    }
  });

  return updateUser;
}

const getDriveDetails = async (email) => {
  const currUser = await User.findOne({
    email: email
  });
  if (!currUser || !currUser.DriveAPI) {
    return null;
  }
  const fids = {
    "p_fid": currUser.DriveAPI ? currUser.DriveAPI.parentId : null,
    "myp_fid": currUser.DriveAPI ? currUser.DriveAPI.myprojectsId : null,
    "sp_fid": currUser.DriveAPI ? currUser.DriveAPI.sharedprojectsId : null,
  }
  return fids;
}



// Google Api Tokens Services
const getTokens = async (email) => {
  const currUser = await User.findOne({
    email: email
  });
  return (currUser.tokens ? JSON.parse(currUser.tokens) : null);
}

const getRefreshToken = async (email) => {
  const currUser = await User.findOne({
    email: email
  });
  return (currUser.refreshToken ? (currUser.refreshToken) : null);
}

const updateTokens = async (email, tokens) => {
  const currUser = await User.findOne({
    email: email
  });
  if (!currUser) {
    return null;
  }
  //console.log(tokens);
  
  if (tokens.refresh_token) {
    console.log("Storing Refresh Token To DB...");
    await User.updateOne({
      email: email
    }, {
        tokens: JSON.stringify(tokens),
        refreshToken: tokens.refresh_token
    }, {
      upsert: true
    });
    return;
  } else {
    console.log("Updating Tokens To DB...");
    await User.updateOne({
      email: email
    }, {
        tokens: JSON.stringify(tokens)
    }, {
      upsert: true
    });
    return;
  }
}

module.exports = {
  loginUserService,
  linkDriveDB,
  getTokens,
  updateTokens,
  getDriveDetails,
  getRefreshToken
};
