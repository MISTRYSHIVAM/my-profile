const express = require('express');
const route = express.Router();
const multer = require('multer');
const pagePost = require('../models/Page_post');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'pagepost')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const pagepost = multer({ storage: storage })

route.post('/:page_id', pagepost.single('image'), (req, res) => {
    try {
        const postData = new pagePost({
            page_id: req.params.page_id,
            org_name: req.body.org_name,
            description: req.body.description,
            post_pic: {
                data: fs.readFileSync('pagepost/' + req.file.filename),
                contentType: "image/png"
            }
        })
        postData.save()
        res.json({ msg: "posted successfully", postdata: postData })

    } catch (error) {
        res.json({ err: "something went wrong" })
    }
});
module.exports = route