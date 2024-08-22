const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSkillStatusSchema = new Schema({
    user_id : {
        type : String,
        required : true,
        unique : true
    },
    user_name : {
        type : String,
        required : true     
    },
    status : {
        type : String,
        required : true
    },
    university : {
        type : String
    },
    current_job : {
        type : String
    },
    current_company : {
        type : String
    },
    job_type : {
        type : String
    },
    skill_area : {
        type : Array,
        required : true
    },
    expect_job : {
        type : String,
        require : true
    },
    expect_location : {
        type : String,
        require : true
    }
},{collection : "user_skill_status"});

const user_skill_status = mongoose.model("user_skill_status" , userSkillStatusSchema);
user_skill_status.createIndexes();
module.exports = user_skill_status