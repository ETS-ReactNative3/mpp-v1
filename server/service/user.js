const {addUser,getUserDetails,addCredentials} = require('../db/user.js');

const loginUserService = async (user) => {
    const User = await addUser(user);
    return User;
};

const getUserService = async (user) => {
    const User = await getUserDetails(user);
    return User;
};

const addCredentialsService = async (credentials,email) => {
    const User = await addCredentials(credentials,email);
    return User;
}

module.exports = {
    loginUserService,
    getUserService,
    addCredentialsService
};