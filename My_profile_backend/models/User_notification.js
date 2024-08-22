const mongoose = require('mongoose');
const { Schema } = mongoose;

//to create mongoose schema(collection)
const userNotiSchema = new Schema({
    to : {
        type : String,   
    },
    from : {
        type : String,      
    },
    notification : {
        type : String,
    },
} ,{timestamps : true , collection : "user_noti"});

const user_notification = mongoose.model("user_noti",userNotiSchema);
user_notification.createIndexes();
module.exports = user_notification;