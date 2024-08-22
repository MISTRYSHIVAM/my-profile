const express = require('express');
const router = express.Router();
const user = require('../models/User_authentication')
const page = require('../models/Page_authentication');

router.put('/:page_id', async (req, res) => {
    await page.findByIdAndUpdate({ _id: req.params.page_id }, { $addToSet: { org_admin: req.body.user_id } })
        .then(async () => {
            await user.findByIdAndUpdate({ _id: req.body.user_id }, { isadmin: "yes" })
                .then(() => {
                    res.send("Added")
                })
        })
})

module.exports = router