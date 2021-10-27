const User = require('../db/user.js');

const loginUserService = async (user) => {
    var new_user = new User(user)
      
    new_user.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
            return result;
        }
    })
};

module.exports = {
    loginUserService
};