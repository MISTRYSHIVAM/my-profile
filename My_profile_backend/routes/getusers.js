const express = require('express');
const router = express.Router();
//const user_personalinfo = require('../models/User_personal_information');
const user_profile = require('../models/User_profilepic');
const user_skill = require('../models/User_skill_status');

router.post('/:text', async (req, res) => {
    const alldata  = await user_profile.find({user_name : {$regex : req.params.text , $options: '-i'}})
    res.send(alldata)
})

router.post('/byskill/:text',async (req,res)=>{
    const skillf = [];
    req.body.byskill.map((x)=>{
        skillf.push(x.label)
    })
    console.log(skillf)
    const y = []
    const alldata  = await user_skill.find({skill_area : {$in : skillf} , user_name : {$regex : req.params.text , $options: '-i'} })
    alldata.map((x)=>{
        y.push(x.user_name)
    })
    if(y.length !==0 ){
        const data = await user_profile.find({user_name : {$in : y} })
        res.send(data)
    }
    else
    {
        console.log("no")
    }
})

module.exports = router