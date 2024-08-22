const mongoose = require('mongoose');
const { Schema } = mongoose;

//to create mongoose schema(collection)
const userchatSchema = new Schema({
    conversation : {
        type : String,
    },
    sender : {
        type : String,
        required : true     
    },
    message : {
        type : String,
        required : true
    },
} ,{timestamps : true , collection : "user_chat"});

const user_chat = mongoose.model("user_chat",userchatSchema);
user_chat.createIndexes();
module.exports = user_chat;
