const express = require('express')
const router = express.Router();
const user_noti = require('../models/User_notification');

router.get('/:user_id', async (req, res) => {
    const data = await user_noti.find({to : req.params.user_id})
    if(data.length > 0)
    {
        res.send(data)
    }
    else
    {
        res.send("no")
    }
})

module.exports = router