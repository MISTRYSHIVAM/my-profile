const express = require('express')
const router = express.Router();
const user = require('../models/User_personal_information')
const recrutment = require('../models/Jobrecrutment')

router.get('/:user_id', async (req, res) => {
    const userdata = await user.findOne({ user_id: req.params.user_id })
    const allRecrutment = await recrutment.findOne({ page_id: { $in: userdata.pagefollow } })
    res.send(allRecrutment)
})

module.exports = router