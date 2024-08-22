const express = require('express');
const router = express.Router();
const user_personalinfo = require('../models/User_personal_information')
const page = require('../models/Page_info');

router.post('/:page_id', async (req, res) => {
    //console.log(req.body.array.page_id)
    await user_personalinfo.findOneAndUpdate({ user_id: req.body.array.user_id },{$addToSet : { pagefollow: req.params.page_id }})
    .then(async () => {
        await page.findOneAndUpdate({page_id : req.params.page_id } ,{$addToSet : { page_follower : req.body.array }} )
        res.send({ "msg" :"followed" })
    })
})

module.exports = router