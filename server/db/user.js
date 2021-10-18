const db = require('./db.js');
const { ObjectId } = require('mongodb');

const usersCollectionRef = () => db.get().collection('USERS');

const addUser = async user => {
  const isUserPresent = await usersCollectionRef().findOne({
    email: user.email,
  });
  if (isUserPresent) {
    return { error: 'User Already Present' };
  }
  return usersCollectionRef().insertOne(user);
};

const getUserDetails = user =>
  usersCollectionRef().findOne({ email: user.email });

const addCredentials = async (credentials, email) => {
  const isUserPresent = await usersCollectionRef().findOne({ email });
  if (isUserPresent) {
    return { error: 'User Not Present' };
  }
  return usersCollectionRef().updateOne({ email }, { $set: { credentials } });
};

module.exports = {
  addUser,
  getUserDetails,
  addCredentials,
};
