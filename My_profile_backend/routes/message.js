const express = require('express');
const router = express.Router();
const message = require('../models/Message')

router.get('/:conversation', async (req, res) => {
    const chat = await message.find({conversation : req.params.conversation})
    res.send(chat)
})

router.post('/', async (req, res) => {
    const newmessage = new message(req.body)
    try {
        const message = await newmessage.save()
        res.send(message)
    } catch (error) {
        res.send("server not respond")
    }
})

module.exports = router