const express = require('express');
const router = express.Router();
const user_profile = require('../models/User_profilepic');
const user_address = require('../models/User_personal_information');
const user_skill = require('../models/User_skill_status');

router.post('/bycity',async (req,res)=>{
    //console.log("hi")
    const cityf = [];
    req.body.bycity.map((x)=>{
        cityf.push(x.label)
    })
    //console.log(cityf)
    const y = []
    const alldata  = await user_address.find({city : {$in : cityf}})
    alldata.map((x)=>{
        y.push(x.user_name)
    })
    if(y.length !==0 ){
        const data = await user_profile.find({user_name : {$in : y} })
        res.send(data)
        //console.log(data)
    }
    else
    {
        //console.log("no")
        res.send('')
    }
})

router.post('/byskill',async (req,res)=>{
    //console.log("hi")
    const skillf = [];
    req.body.byskill.map((x)=>{
        skillf.push(x.label)
    })
    //console.log(cityf)
    const y = []
    const alldata  = await user_skill.find({skill_area : {$in : skillf}})
    alldata.map((x)=>{
        y.push(x.user_name)
    })
    if(y.length !==0 ){
        const data = await user_profile.find({user_name : {$in : y} })
        res.send(data)
        //console.log(data)
    }
    else
    {
        //console.log("no")
        res.send('')
    }
})

router.post('/byboth',async (req,res)=>{
    //console.log("hi")
    const skillf = [];
    req.body.byskill.map((x)=>{
        skillf.push(x.label)
    })
    const cityf = [];
    req.body.bycity.map((x)=>{
        cityf.push(x.label)
    })
    //console.log(cityf)
    const y = []
    const data1 = await user_address.find({city : {$in : cityf}})
    data1.map((x)=>{
        y.push(x.user_name)
    })
    const z = []
    const data2  = await user_skill.find({skill_area : {$in : skillf}})
    data2.map((x)=>{
        if(y.includes(x.user_name)){
            z.push(x.user_name)
        }
    })

    if(z.length !==0 ){
        const data = await user_profile.find({user_name : {$in : z} })
        res.send(data)
        //console.log(data)
    }
    else
    {
        //console.log("no")
        res.send('')
    }
})

module.exports = router