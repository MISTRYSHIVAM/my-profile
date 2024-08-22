const express = require('express');
const routes = express.Router();
const { body, validationResult } = require('express-validator');
const recrutment = require('../models/Jobrecrutment')

routes.post('/:page_id', [
    body('email', 'Please enter Proper email').notEmpty().isEmail(),
    body('description', 'Please enter description').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, err: errors.array()[0].msg });
    }
    const recrutment_info = await recrutment.findOne({ page_id: req.params.page_id })
    const rec_no = recrutment_info.recrutment_info.length
    const today = new Date()
    //console.log(today.toISOString())
    const savedata = { rec_no: rec_no + 1, jobtype: req.body.job_type, description: req.body.description, email : req.body.email , date: today.toISOString() }
    //console.log(savedata)
    await recrutment.findOneAndUpdate({ page_id: req.params.page_id }, { $addToSet: { recrutment_info: savedata }})
    res.json({ success: true, msg: "Recrutment Created" })
})

module.exports = routes;