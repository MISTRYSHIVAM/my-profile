const mongoose = require('mongoose');

const userPosts = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },
    user_name : {
        type : String,
        required : true     
    },
    description : {
        type : String,
        required : true
    },
    post : {
        data : Buffer,
        contentType : String
    },
    like : {
        type : Array,
        default : []
    }
}, {timestamps : true ,collection : "user_post"})

const userPost = mongoose.model("userPosts",userPosts)
module.exports = userPost;