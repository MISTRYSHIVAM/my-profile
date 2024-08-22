const express = require('express');
const route = express.Router();
const page = require('../models/Page_authentication')
const page_info = require('../models/Page_info')

route.get('/:owner_id', async (req, res) => {
    const page1 = await page.findOne({org_admin : {$in : req.params.owner_id }})
    const pageInfo = await page_info.findOne({ page_id: page1._id })
    const follow_pagearray = pageInfo.page_follower;

    function compare(a, b) {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }
        return 0;
    }
    follow_pagearray.sort(compare);

    res.send(follow_pagearray)
});

module.exports = route