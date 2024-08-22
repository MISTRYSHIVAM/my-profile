const express = require('express')
const router = express.Router();
const friend = require('../models/User_personal_information');
const user_noti = require('../models/User_notification');

router.put('/:user_id', async (req, res) => {
    const newdata = new user_noti({
        to : req.body.to,
        from : req.body.fromn,
        notification : "Statred following You"
    })
    await friend.findOneAndUpdate({ user_id: req.params.user_id },{$addToSet : { following : req.body.to }})
    .then(async () => {
        await friend.findOneAndUpdate({user_id : req.body.to},{$addToSet : { follower : req.params.user_id }})
        await newdata.save()
        await friend.findOne({ user_id: req.params.user_id }).then((updatedData) => {
            res.send({ "msg" :"followed" })
        })
    })
})

module.exports = router