const express = require('express');
const router = express.Router();
const user = require('../models/User_profilepic');

router.get('/:search_text', async(req,res) => {
    let data = await user.find({user_name : {$regex : req.params.search_text  , $options: '-i'}})
    res.send((data.length > 0 ) ? data : "no")
})

module.exports = router