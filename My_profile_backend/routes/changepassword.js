const express = require('express');
const routes = express.Router();
const user_mst = require('../models/User_authentication')

routes.post('/',async (req,res)=>{
    const data = await user_mst.findOneAndUpdate({user_name : req.body.user_name},{password : req.body.password})
    .then(()=>{
        res.json({success : true})
    })
    .catch(()=>{
        res.json({success : false})
    })
})

module.exports = routes;