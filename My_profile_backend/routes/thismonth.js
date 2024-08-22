const express = require('express');
const route = express.Router();
const page = require('../models/Page_authentication');
const page_info = require('../models/Page_info');

route.get('/:owner_id', async (req, res) => {
    const page1 = await page.findOne({org_admin : {$in : req.params.owner_id }})
    const pageInfo = await page_info.findOne({ page_id: page1._id })
    const thismonth = [];
    const now = new Date()
    const lastmonth = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDate()).toISOString();
    pageInfo &&
    pageInfo.page_follower.map((x) => {
        if (x.date < lastmonth) {
        } else if (x.date > lastmonth) {
            thismonth.push(x.user_id)
        } else {
            
        }
    })
    res.send(thismonth)
});

module.exports = route