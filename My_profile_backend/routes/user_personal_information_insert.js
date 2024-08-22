const express = require('express');
const routes = express.Router();
const { body , validationResult } = require('express-validator');
const user_personalinfo = require('../models/User_personal_information');

routes.post('/create',[ 
    body('user_id','user id is needed').notEmpty(),
    body('state','Please select your state').notEmpty(),  
    body('city','Please select your city').notEmpty(),  
    body('mobile_no','Please enter mobile_no').notEmpty(), 
    body('mobile_no','Please enter 10 digit mobile_no').isLength({max : 10 , min : 10}), 
    body('age','Please enter your age').notEmpty(), 
    body('age','Please enter valid age').isInt({min :5 ,max : 150})
    ] ,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({success : false , errors: errors.array()[0].msg });
    }
    user_personalinfo.create({
        user_id : req.body.user_id,
        user_name : req.body.user_name,
        mobile_no : req.body.mobile_no,
        state : req.body.state.label,
        city : req.body.city.label,
        age : req.body.age
    }).then(user_personalinfo => res.json({success : true , user : user_personalinfo , message : "Data uploaded successfuly"}))
    .catch(err => res.json({errors : 'Data already uploaded'}))
    
})

module.exports = routes;