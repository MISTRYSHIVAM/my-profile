const express = require('express');
const router = express.Router();
const user_skill = require('../models/User_skill_status');

router.get('/:user_id', (req,res) => {
    user_skill.find({user_id : req.params.user_id})
    .then(user_skill =>{ (user_skill)?res.json({success : true , userskill : user_skill }):res.json({success : false , message : "not found"})})
})

module.exports = router