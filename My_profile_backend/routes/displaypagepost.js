const express = require('express');
const route = express.Router();
const pagePost = require('../models/Page_post');

route.get('/:page_id', async(req,res) => {
    const allData = await pagePost.find({ page_id : req.params.page_id}).sort({"createdAt" : -1})
    res.send(allData)
})

module.exports=route