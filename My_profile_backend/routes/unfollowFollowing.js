const express = require('express')
const router = express.Router();
const friend = require('../models/User_personal_information');

router.put('/:user_id', async (req, res) => {
    await friend.findOneAndUpdate({ user_id: req.params.user_id },{$pull : { following : req.body.to }})
    .then(async () => {
        await friend.findOneAndUpdate({user_id : req.body.to},{$pull : { follower : req.params.user_id }})
        await friend.findOne({ user_id: req.params.user_id }).then((updatedData) => {
            res.send({msg : "unfollowed" })
        })
    })
})

module.exports = router