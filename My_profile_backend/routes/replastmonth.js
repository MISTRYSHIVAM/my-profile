const express = require('express');
const route = express.Router();
const page_info = require('../models/Page_info');
const page = require('../models/Page_authentication');

route.get('/:owner_id', async (req, res) => {
    const page1 = await page.findOne({org_admin : {$in : req.params.owner_id }})
    const pageInfo = await page_info.findOne({ page_id: page1._id })
    const lastmonthdata = [];
    const months = ["2023-01-01T17:01:50.699Z","2023-02-01T17:01:50.699Z","2023-03-01T17:01:50.699Z","2023-04-01T17:01:50.699Z","2023-05-01T17:01:50.699Z","2023-06-01T17:01:50.699Z","2023-07-01T17:01:50.699Z","2023-08-01T17::50.699Z","2023-09-01T17:09:50.699Z","2023-10-01T17:10:50.699Z","2023-01-01T17:11:50.699Z","2023-12-01T17:01:50.699Z"];
    const now = new Date()
    const lastmonth = new Date(now.getFullYear(), now.setMonth(i), now.getDate()).toISOString();
    pageInfo &&
    pageInfo.page_follower.map((x) => {
        if (x.date < lastmonth) {
        } else if (x.date > lastmonth) {
            lastmonthdata.push(x.user_id)
        } else {
            
        }
    })
    res.send(lastmonthdata)
});

module.exports=route