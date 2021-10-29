const User = require('../db/user.js');

const loginUserService = async (user) => {
    var new_user = new User(user)
    new_user.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            return result;
        }
    })
};

const linkDriveDB = async (email,newData) => {
    await User.updateOne({
        email: email
        },
        {
        DriveAPI : { 
            parentId : newData.parentId,
            myprojectsId: newData.myprojectsId,
            sharedprojectsId: newData.sharedprojectsId,
        }}
    );
}

const getTokens = async (email) => {
    const currUser = await User.findOne({email : email}); 
    return (currUser ? currUser.tokens : null);
}

const updateTokens = async (email,tokens) => {
      await User.updateOne({
        email: email
        },
        {tokens : JSON.stringify(tokens)},
        { upsert: true }
    );
}

module.exports = {
    loginUserService,
    linkDriveDB,
    getTokens,
    updateTokens
};