const mongoose = require('mongoose');

const pagePost = new mongoose.Schema({
    page_id : {
        type : String,
        required : true     
    },
    org_name : {
        type : String,
        required : true     
    },
    description: {
        type : String
    },
    post_pic : {
        data : Buffer,
        contentType : String
    },
    like : {
        type : Array,
        default : []
    }
}, {timestamps : true ,collection : "page_post"})

const pagepost = mongoose.model("pagePost",pagePost)
module.exports = pagepost;