const express = require('express');
const router = express.Router();
const users = require('../models/User_profilepic')
const page = require('../models/Page_authentication');

router.get('/:search_text', async (req, res) => {
    const adminList = []
    const alldata = await page.findById({ _id : req.params.search_text })
    for(i in alldata.org_admin)
    {
        adminList[i] = alldata.org_admin[i];
    }
    const datatosend = await users.find({user_id : {$in : adminList }})
    res.send(datatosend)
})

module.exports = router