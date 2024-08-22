const mongoose = require('mongoose');

const jobRecrutment = new mongoose.Schema({
    page_id: {
        type: String,
        required: true
    },
    org_name: {
        type: String,
        required: true
    },

    recrutment_info: [
        { rec_no: Number, jobtype: Array, description: String, email: String, date: String }
    ],
    response: [
        { rec_no: Number, user_id: String, user_name: String, email: String, jobtype: Array, date: String }
    ]
}, { timestamps: true, collection: "page_recrutment" })

const recrutment = mongoose.model("page_recrutment", jobRecrutment)
module.exports = recrutment;