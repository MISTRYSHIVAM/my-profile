const express = require('express');
const route = express.Router();
const page = require('../models/Page_info')

route.get('/:owner_id',  async(req, res) => {
    const pageInfo = await page.findOne({org_admin : { $in : req.params.owner_id } })
    res.send(pageInfo)
});

module.exports =route