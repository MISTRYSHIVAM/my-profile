const mongoose = require('mongoose');


const pageInfo = new mongoose.Schema({
    page_id : {
        type : String,
        required : true     
    },
    org_name : {
        type : String,
        required : true     
    },
    org_owner : {
        type : String,
    },
    page_follower : [
        { user_id : String,user_name : String, date : String}
    ] 
}, {timestamps : true ,collection : "page_info"})

const pageinfo = mongoose.model("pageInfo",pageInfo)
module.exports = pageinfo;