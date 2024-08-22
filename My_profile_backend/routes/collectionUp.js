const express = require('express');
const route = express.Router();
const recrutment = require('../models/Jobrecrutment')

route.post('/', async(req, res) => {
    const data = new recrutment({
        page_id : "642478228e9acbae08f71cf4",
        org_name : "axyz"
    })
    await data.save()
    res.send(data)
});

module.exports = route