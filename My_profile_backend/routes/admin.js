const express = require('express');
const route = express.Router();
const page = require('../models/Page_authentication')

route.get('/:owner_id',  async(req, res) => {
    const pageInfo = await page.findOne({org_admin : req.params.owner_id})
    res.send(pageInfo)
});

module.exports =route