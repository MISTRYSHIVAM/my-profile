const express = require('express');
const route = express.Router();
const profile = require('../models/User_profilepic')

route.post('/', async (req, res) => {
    const photos = await profile.find({ user_id: { $in: req.body } })
    res.send(photos)
});

module.exports = route
