const express = require('express')
const router = express.Router();
const recrutment = require('../models/Jobrecrutment')

router.get('/:page_id', async (req, res) => {
    const Recrutment = await recrutment.findOne({page_id : req.params.page_id})
    res.send(Recrutment)
})

module.exports = router