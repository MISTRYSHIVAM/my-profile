const mongoose = require('mongoose');
const { Schema } = mongoose;

//to create mongoose schema(collection)
const chatroomSchema = new Schema({
    members : {
        type : Array,   
    }
} ,{timestamps : true , collection : "userchatroom_mst"});

const chatroom = mongoose.model("userchatroom_mst",chatroomSchema);
chatroom.createIndexes();
module.exports = chatroom;
