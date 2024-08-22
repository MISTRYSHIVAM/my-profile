const express = require('express')
const router = express.Router();
const user = require('../models/User_personal_information')
const recrutment = require('../models/Jobrecrutment')

router.get('/:user_id', async (req, res) => {
    const userdata = await user.findOne({user_id : req.params.user_id})
        await recrutment.findOne({page_id : {$in : userdata.pagefollow}})
        .then((allRecrutment)=>{
            res.send((allRecrutment)?allRecrutment:"not found")
        })
        .catch(()=>{
            res.send("not found")
        })
})

module.exports = router