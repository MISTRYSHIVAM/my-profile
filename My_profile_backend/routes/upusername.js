const express = require('express');
const routes = express.Router();
const { body , validationResult } = require('express-validator');
const user_mst = require('../models/User_authentication');
const user_personal_information = require('../models/User_personal_information');
const user_post = require('../models/User_post');
const user_skill_status = require('../models/User_skill_status');
const user_profilepic = require('../models/User_profilepic');

routes.post('/:user_id' , async(req,res) => {
    // console.log(req.body.newname)
    const f = await user_mst.findOneAndUpdate({_id : req.params.user_id} , {user_name : req.body.newname})
    const f2 = await user_personal_information.findOneAndUpdate({user_id : req.params.user_id} , {user_name : req.body.newname})
    // //const f3 = await user_post.f({user_id : req.params.user_id} , {user_name : req.body})
    const f4 = await user_skill_status.findOneAndUpdate({user_id : req.params.user_id} , {user_name : req.body.newname})
    const f5 = await user_profilepic.findOneAndUpdate({user_id : req.params.user_id} , {user_name : req.body.newname})
    res.send({success : true , message : "updated"})
})

module.exports = routes;