const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email:  String,
    familyName: String,
    givenName:  String,
    googleId:  String,
    imageUrl:  String,
    name:  String
});

module.exports = User = mongoose.model('User',userSchema); 