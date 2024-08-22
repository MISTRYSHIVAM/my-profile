const express = require('express');
const route = express.Router();
const userPost = require('../models/User_post');
const user_personalinfo = require('../models/User_personal_information')

route.get('/:user_id', async(req,res) => {
    const follower = await user_personalinfo.findOne({ user_id: req.params.user_id})
    const allData = await userPost.find({ user_id : { $in : follower.following }}).sort({"createdAt" : -1})
    res.send(allData)
})

route.get('/user/:user_id', async(req,res) => {
    const allPost = await userPost.find({ user_id : req.params.user_id}).sort({"createdAt" : -1})
    res.send(allPost)
})

module.exports=route