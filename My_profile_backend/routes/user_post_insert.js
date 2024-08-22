const express = require('express');
const route = express.Router();
const multer = require('multer');
const userPost = require('../models/User_post');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'posts')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const posts = multer({ storage: storage })

route.post('/:user_id', posts.single('image'), (req, res) => {
    try {
        const postData = new userPost({
            user_id: req.params.user_id,
            user_name: req.body.user_name,
            description: req.body.description,
            post: {
                data: fs.readFileSync('posts/' + req.file.filename),
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