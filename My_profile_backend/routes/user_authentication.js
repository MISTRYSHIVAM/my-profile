const express = require('express');
const routes = express.Router();
const { body , validationResult } = require('express-validator');
const user_mst = require('../models/User_authentication');

routes.post('/create',[
    body('user_name','Please enter your user_name').notEmpty(),
    body('email','Please enter Proper email').notEmpty().isEmail(),  
    body('password','Please enter password').notEmpty(), 
    body('password','Please enter minimum 6 digit password').isLength({min : 6}) 
    ] ,async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({success : false , errors: errors.array()[0].msg });
    }

    await user_mst.create({
        user_name : req.body.user_name,
        email : req.body.email,
        password : req.body.password,
        isadmin : "no"
    })
    .then(user_mst => {
        res.json({success : true , user : user_mst , message : "Account created successfuly"})
    })
    .catch(err => res.json({errors : 'Email already in use'}))

    
})

module.exports = routes;