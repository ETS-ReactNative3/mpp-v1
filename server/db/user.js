const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email:  {type: 'String', required: true,unique: true},
    familyName: String,
    givenName:  String,
    googleId:  String,
    imageUrl:  String,
    name:  String,
    DriveAPI : { 
        parentId : String,
        myprojectsId: String,
        sharedprojectsId: String,
    },
    OAuth : {
        tokens : String,
        refreshToken : String,
    }
   
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

module.exports = User = mongoose.model('User',userSchema); 