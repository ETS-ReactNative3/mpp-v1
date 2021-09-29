import db from './db.js';

const usersCollectionRef = () => db.get().collection('USERS');

const addUser = async (user) => {
    const isUserPresent = await usersCollectionRef().findOne({ email: user.email });
    if (isUserPresent) {
      // throw new ConflictError('User Already Present');
      return { error: 'User Already Present' };
    }
    return usersCollectionRef().insertOne(user);
};

export default {
    addUser,
};
