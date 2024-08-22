const express = require('express');
const router = express.Router();
const conversation = require('../models/Conversation')

router.post('/', async (req, res) => {
    const newconversation = new conversation({
        members : [req.body.sender_id , req.body.receiver_id]
    })
    try {
        const con = await newconversation.save()
        res.send(con)
    } catch (error) {
        res.send("server not respond")
    }
})

router.get('/:con', async (req, res) => {
    try {
        const con = await conversation.find({members : {$in : req.params.con }})
        res.send(con)
    } catch (error) {
        res.send("server not respond")
    }
})

module.exports = router