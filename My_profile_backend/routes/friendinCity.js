const express = require('express');
const router = express.Router();
const user_personalinfo = require('../models/User_personal_information');
const user_profile = require('../models/User_profilepic');

router.get('/:user_id', async (req, res) => {
    const friendlist = [];
    const user_perInfo = await user_personalinfo.findOne({ user_id: req.params.user_id })

    await user_personalinfo.find({ $and: [{ user_id: { $ne: req.params.user_id } }, { city: user_perInfo.city }] },)
        .then((frienddata) => {
            for (i in frienddata) {
                if (!user_perInfo.following.includes(frienddata[i].user_id)) {
                    friendlist[i] = frienddata[i].user_id;
                }
            }
        })
    user_profile.find({ "user_id" : { $in : friendlist} } ).select({user_id : 1 , user_name :1  , profilepic : 1})
    .then(user_mst => { 
        res.json(user_mst) 
    })
})

module.exports = router