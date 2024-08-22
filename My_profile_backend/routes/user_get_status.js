const express = require('express');
const user_status = require('../models/User_status');
const router = express.Router();

router.get('/', (req,res) => {
    user_status.find({university : "vnsgu"})
    .then(user_status =>{ (user_status)?res.json({success : true , user : user_status }):res.json({success : false , message : "not found"})})
})

module.exports = router