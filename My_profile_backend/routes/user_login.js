const express = require('express');
const routes = express.Router();
const { body , validationResult } = require('express-validator');
const user_mst = require('../models/User_authentication');

routes.post('/',[
    body('email','Please enter email').notEmpty(),
    body('email','Please enter Proper email').isEmail(),  
    body('password','Please enter password').notEmpty()
    ] ,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({success : false , emessage: errors.array()[0].msg });
    }
    user_mst.findOne({ $and : [{email : req.body.email},{password : req.body.password}]
    }).then(user_mst =>{ (user_mst)?res.json({success : true , user : user_mst , message : "Welcome to My_profile application"}):res.json({success : false , emessage : "Email password not matched"})})
})


module.exports = routes;