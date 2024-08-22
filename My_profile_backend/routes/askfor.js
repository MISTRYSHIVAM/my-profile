const express = require('express')
const router = express.Router();
const user_noti = require('../models/User_notification');

router.post('/:user_id', async (req, res) => {
    const newdata = new user_noti({
        to : req.body.to,
        from : req.params.user_id,
        notification : "Loking for You for word at their company"
    })
    await newdata.save()
    res.send({ "msg" :"Send" })
})

module.exports = router