const express = require('express');
const router = express.Router();
const user_skill = require('../models/User_skill_status');
const user_personalinfo = require('../models/User_personal_information');
const user_profile = require('../models/User_profilepic');

router.get('/:user_id',async (req,res) => {
    const userfriendlist = await user_personalinfo.findOne({ user_id: req.params.user_id }); 
    const friendlist = [];
    const user_perInfo = await user_skill.findOne({ user_id: req.params.user_id })

    const friend = await user_skill.find({$and : [{user_id : {$ne : req.params.user_id} },{expect_job :{$in : user_perInfo.skill_area } }]} , )

    for(i in friend)
    {
        if(!userfriendlist.following.includes(friend[i].user_id))
        {
                friendlist[i] = friend[i].user_id;
        }
    }
    user_profile.find({user_id : { $in : friendlist} }).select({user_id : 1 , user_name : 1 , profilepic : 1})
    .then(user_mst => { 
        res.send(user_mst)
    })
})

module.exports = router