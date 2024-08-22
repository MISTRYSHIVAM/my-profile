const express = require('express');
const router = express.Router();
const user_personalinfo = require('../models/User_personal_information')
const page = require('../models/Page_authentication');

router.get('/:search_text', async (req, res) => {
    const alldata = await page.find({ org_name: { $regex: req.params.search_text  , $options: '-i'} })
    .then((alldata)=>{
        res.send((alldata.length > 0 ) ? alldata : "no")
    })
})

module.exports = router