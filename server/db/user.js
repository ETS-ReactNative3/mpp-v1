const db = require('./db.js');
const {ObjectId} = require('mongodb');

const usersCollectionRef = () => db.get().collection('USERS');

const addUser = async (user) => {
    const isUserPresent = await usersCollectionRef().findOne({ email: user.email });
    if (isUserPresent) {
      return { error: 'User Already Present' };
    }
    return usersCollectionRef().insertOne(user);
};

const getUserDetails = (user) => {
  return usersCollectionRef().findOne({ email : user.email});
};

const addCredentials = async (credentials,email) => {
  const isUserPresent = await usersCollectionRef().findOne({ email: email });
  if (isUserPresent) {
    return { error: 'User Not Present' };
  };
  return usersCollectionRef().updateOne({email: email}, {$set: {credentials: credentials }});
};

module.exports = {
    addUser,
    getUserDetails,
    addCredentials
};