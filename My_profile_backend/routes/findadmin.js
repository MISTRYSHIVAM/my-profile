const express = require('express');
const router = express.Router();
const users = require('../models/User_profilepic')
const page = require('../models/Page_authentication');

router.get('/:search_text', async (req, res) => {
    const alldata = await users.find({ user_name : {$regex : req.params.search_text , $options: '-i'}})
    res.send(alldata)
})

module.exports = router