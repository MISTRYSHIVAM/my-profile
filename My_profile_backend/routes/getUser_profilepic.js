const express = require('express');
const route = express.Router();
const userprofilepic = require('../models/User_profilepic');

route.get('/:user_id', (req,res) => {
    userprofilepic.findOne({ user_id : req.params.user_id} , (err,doc)=>{
        res.send(doc)
    })
})

module.exports=route