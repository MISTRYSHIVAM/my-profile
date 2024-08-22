const mongoose = require('mongoose');
const { Schema } = mongoose;

//to create mongoose schema(collection)
const userAuthSchema = new Schema({
    user_name : {
        type : String,
        required : true     
    },
    email : {
        type : String,
        required : true,
        unique : true       
    },
    password : {
        type : String,
        required : true
    },
    isadmin : {
        type : String
    }
} ,{timestamps : true , collection : "user_mst"});

const user_mst = mongoose.model("user_mst",userAuthSchema);
user_mst.createIndexes();
module.exports = user_mst;