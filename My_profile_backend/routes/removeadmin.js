const express = require('express');
const router = express.Router();
const user = require('../models/User_authentication')
const page = require('../models/Page_authentication');

router.put('/:page_id', async (req, res) => {
    await page.findByIdAndUpdate({ _id: req.params.page_id }, { $pull: { org_admin: req.body.user_id } })
        .then(async () => {
            await user.findByIdAndUpdate({ _id: req.body.user_id }, { isadmin: "no" })
                .then(() => {
                    res.send("removed")
                })
        })
})

module.exports = router