const mongoose = require('mongoose');

const pageAuthentication = new mongoose.Schema({
    org_name : {
        type : String,
        required : true     
    },
    org_website : {
        type : String,
        required : true     
    },
    industry : {
        type : String,
        required : true     
    },
    org_owner : {
        type : String,
    },
    org_size : {
        type : String,
        required : true
    },
    org_type : {
        type : String,
        required : true
    },
    org_pic : {
        data : Buffer,
        contentType : String
    },
    org_admin : { type : Array, default : [] }
}, {timestamps : true ,collection : "page_mst"})

const pageAuth = mongoose.model("pageAuthentication",pageAuthentication)
module.exports = pageAuth;