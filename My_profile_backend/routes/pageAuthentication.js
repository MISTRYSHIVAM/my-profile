const express = require('express');
const route = express.Router();
const multer = require('multer');
const page = require('../models/Page_authentication')
const pageInfo = require('../models/Page_info')
const user = require('../models/User_authentication')
const recrutment = require('../models/Jobrecrutment')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'pagePhoto')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const posts = multer({ storage: storage })

route.post('/:user_id', posts.single('image'), (req, res) => {
    let defaultProfile = '';
    if(req.file)
    {
        console.log("yo")
        defaultProfile = req.file.filename;
    }
    else
    {
        console.log("no")
        defaultProfile = "company.png";
    }
    try {
        const pageData = new page({
            org_name: req.body.orgname,
            org_website: req.body.orgwebsite,
            industry : req.body.industry,
            org_owner : req.body.org_owner,
            org_size: req.body.size,
            org_type: req.body.type,
            org_admin: req.params.user_id,
            org_pic : {
                data: fs.readFileSync('pagePhoto/' + defaultProfile),
                contentType: "image/png"
            }
        })
        pageData.save()

        const pageData2 = new pageInfo({
            page_id : pageData._id,
            org_name : req.body.orgname,
            org_owner : req.body.org_owner,
        })
        pageData2.save()

        const pageData3 = new recrutment({
            page_id : pageData._id,
            org_name : req.body.orgname
        })
        pageData3.save()

        user.findByIdAndUpdate({_id : req.params.user_id } , {isadmin : "yes"})
        .then(
            res.json({ msg: "posted successfully", pageData: pageData })
        )

    } catch (error) {
        res.json({ err: "something went wrong" })
    }
});

module.exports =route