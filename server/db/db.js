const mongoose = require('mongoose');


const connect = async (url, options) => {
  try {
    await mongoose.connect(url, options);
    console.log('Connected to Mongoose');
  } catch (error) {
    console.error(error);
  }
};


module.exports = { connect };
