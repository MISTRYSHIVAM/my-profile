const express = require('express')
const router = express.Router();
const friend = require('../models/User_personal_information');

router.get('/:user_id', async (req, res) => {
    await friend.findOne({ user_id: req.params.user_id }).select({following : 1 , follower : 1})
    .then((friends)=> {
        res.send(friends)
    })
    // console.log("f"+allFriend)
    // console.log("---------------------------------------------------------------")
})

module.exports = router