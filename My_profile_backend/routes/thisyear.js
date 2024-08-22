const express = require('express');
const route = express.Router();
const page = require('../models/Page_authentication');
const page_info = require('../models/Page_info');

route.get('/:owner_id', async (req, res) => {
    const page1 = await page.findOne({ org_admin: { $in: req.params.owner_id } })
    const pageInfo = await page_info.findOne({ page_id: page1._id })
    const thisyear = [];
    const now = new Date()
    const m = now.getMonth()
    const months = ["2023-01-01T17:01:50.699Z","2023-02-01T17:01:50.699Z","2023-03-01T17:01:50.699Z","2023-04-01T17:01:50.699Z","2023-05-01T17:01:50.699Z","2023-06-01T17:01:50.699Z","2023-07-01T17:01:50.699Z","2023-08-01T17::50.699Z","2023-09-01T17:09:50.699Z","2023-10-01T17:10:50.699Z","2023-01-01T17:11:50.699Z","2023-12-01T17:01:50.699Z"];
    for ( i = 1 ; i <= m+1 ; i++) {
        let f = 0;
        pageInfo &&
            pageInfo.page_follower.map((x) => {
                if (x.date < months[i-1]) {
                } else if ( x.date < months[i]) {
                    if(x.date > months[i-1])
                    {
                        //console.log(x.date)
                        f = f + 1;
                    }
                } else {

                }
        })
        thisyear.push(f)
    }
    //console.log(thisyear)
    res.send(thisyear)
    // res.send([15,4,8,46,8])
});

module.exports = route