const User = require('../db/user.js');

const loginUserService = async (user) => {
  const currUser = await User.findOne({
    email: user.email
  });
  if(!currUser){
    return null;
  }
  var new_user = new User(user)
  new_user.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      return result;
    }
  })
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
  if (!currUser) {
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
  return (currUser ? JSON.parse(currUser.OAuth.tokens) : null);
}

const getRefreshToken = async (email) => {
  const currUser = await User.findOne({
    email: email
  });
  return (currUser ? JSON.parse(currUser.OAuth.refreshToken) : null);
}

const updateTokens = async (email, tokens) => {
  const currUser = await User.findOne({
    email: email
  });
  if (!currUser) {
    return null;
  }
  
  if (tokens.refresh_token) {
    await User.updateOne({
      email: email
    }, {
      OAuth: {
        tokens: JSON.stringify(tokens),
        refreshToken: tokens.refresh_token
      }
    }, {
      upsert: true
    });
    return;
  } else {
    await User.updateOne({
      email: email
    }, {
      OAuth: {
        tokens: JSON.stringify(tokens)
      }
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
