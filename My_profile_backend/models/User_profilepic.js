const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },
    user_name : {
        type : String,
        required : true     
    },
    profilepic : {
        data : Buffer,
        contentType : String
    }
}, {timestamps : true ,collection : "user_profile"})

const userProfile = mongoose.model("userProfile",userProfileSchema)
module.exports = userProfile;