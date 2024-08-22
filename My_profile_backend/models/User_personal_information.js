const mongoose = require('mongoose')
const { Schema } = mongoose;

const userPersonalSchema = new Schema({
    user_id : {
        type : String,
        required : true,
        unique : true
    },
    user_name : {
        type : String,
        required : true     
    },
    mobile_no : {
        type :Number,
        required :true
    },
    state : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    follower : {
        type : Array
    },
    following : {
        type : Array
    },
    pagefollow : { type : Array }
},{collection : "user_personalinfo"});

const user_personalinfo =mongoose.model("user_personalinfo",userPersonalSchema);
user_personalinfo.createIndexes();
module.exports = user_personalinfo;