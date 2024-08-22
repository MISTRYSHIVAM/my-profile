const express = require('express');
const routes = express.Router();
const recrutment = require('../models/Jobrecrutment')

routes.post('/:page_id', async (req, res) => {
    // console.log(req.body)
    const today = new Date()
    //console.log(today.toISOString())
    const savedata = { rec_no: req.body.rec_no, user_id : req.body.user_id, user_name : req.body.user_name, email : req.body.email, jobtype: req.body.jobtype , date: today.toISOString() }
    //console.log(savedata)

    await recrutment.findOneAndUpdate({ page_id: req.params.page_id }, { $addToSet: { response: savedata }})
    res.json("submited susseccfully")
})

module.exports = routes;