const express = require('express');
const routes = express.Router();
const { body , validationResult } = require('express-validator');
const user_skill_status = require('../models/User_skill_status');

routes.post('/student/create',[
    body('user_id','userid is needed').notEmpty(),
    body('university','Please enter your university name').notEmpty(), 
    body('skill_area','Please enter your skill_area').notEmpty(), 
    body('expect_job','Please enter your expected job').notEmpty(),
    body('expect_location','Please enter expected location for job').notEmpty() 
    ] ,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({success : false , errors: errors.array()[0].msg });
    }
    const skill = []
    for(i in req.body.skill_area)
    {
        skill[i] = req.body.skill_area[i].label
    }
    console.log(req.body.user_id)
    user_skill_status.create({
        user_id : req.body.user_id,
        user_name : req.body.user_name,
        status : "student",
        university : req.body.university,
        skill_area : skill,
        expect_job : req.body.expect_job,
        expect_location : req.body.expect_location
    }).then(user_status => res.json({success : true , user : user_status , message : "Data uploaded successfuly"}))
    .catch(err => res.json({errors : 'Data already uploaded'}))
    
})

routes.post('/employee/create',[
    body('user_id','userid is needed').notEmpty(),
    body('current_job','Please enter your job name').notEmpty(), 
    body('current_company','Please enter your compnay name').notEmpty(), 
    body('job_type','Please choose your job type').notEmpty(), 
    body('skill_area','Please enter your skill_area').notEmpty(), 
    body('expect_job','Please enter your expected job').notEmpty(),
    body('expect_location','Please enter expected location for job').notEmpty() 
    ] ,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({success : false , errors: errors.array()[0].msg });
    }
    const skill = []
    for(i in req.body.skill_area)
    {
        skill[i] = req.body.skill_area[i].label
    }
    console.log(skill)
    user_skill_status.create({
        user_id : req.body.user_id,
        user_name : req.body.user_name,
        status : "employee",
        current_job : req.body.current_job,
        current_company : req.body.current_company,
        skill_area : skill,
        expect_job : req.body.expect_job,
        expect_location : req.body.expect_location,
        job_type : req.body.job_type.label
        
    }).then(user_status => res.json({success : true , user : user_status , message : "Data uploaded successfuly"}))
    .catch(err => res.json({errors : 'Data already uploaded'}))
})


module.exports = routes;