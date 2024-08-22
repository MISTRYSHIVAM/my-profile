const express = require('express');
const route = express.Router();
const page = require('../models/Page_authentication');
const page_info = require('../models/Page_info');

route.get('/:owner_id', async (req, res) => {
    const page1 = await page.findOne({org_admin : {$in : req.params.owner_id }})
    const pageInfo = await page_info.findOne({ page_id: page1._id })
    const lastweekdata = [];
    const now = new Date()
    const lastweek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
    pageInfo &&
    pageInfo.page_follower.map((x) => {
        if (x.date < lastweek) {
        } else if (x.date > lastweek) {
            lastweekdata.push(x.user_id)
        } else {
            
        }
    })
    res.send(lastweekdata)
});

module.exports = route