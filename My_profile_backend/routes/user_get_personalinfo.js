const express = require('express');
const router = express.Router();
const user_personalinfo = require('../models/User_personal_information');

router.get('/:user_id', async(req,res) => {
    await user_personalinfo.findOne({user_id : req.params.user_id})
    .then(user_personalinfo =>{ (user_personalinfo)?res.send([{success : true , user : user_personalinfo }]):res.send([{success : false , message : "not found"}])})
})

module.exports = router

