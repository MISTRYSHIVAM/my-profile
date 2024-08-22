const express = require('express');
const router = express.Router();
const user_personalinfo = require('../models/User_personal_information');

router.get('/:user_id', async(req,res) => {
    const data = await user_personalinfo.findOne({user_id : req.params.user_id})
    if(data){
        res.send(data)
    }
})

module.exports = router

