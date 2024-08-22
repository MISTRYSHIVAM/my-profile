const express = require('express');
const route = express.Router();
const multer = require('multer');
const user_profilepic = require('../models/User_profilepic');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profilepic')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const profilepic = multer({ storage: storage })

route.post('/:user_id', profilepic.single('image'), async (req, res) => {
    const defaultProfile = "userlogo.png";

    if (req.body.profileState === "yes") {
        try {
            const profilepic = {
                data: fs.readFileSync('profilepic/' + req.file.filename),
                contentType: "image/png"
            }
            const profilepicData = new user_profilepic({
                user_id: req.params.user_id,
                user_name: req.body.user_name,
                profilepic: {
                    data: fs.readFileSync('profilepic/' + req.file.filename),
                    contentType: "image/png"
                }
            })
            profilepicData.save()
            res.json({msg : "profile posted successfully"})
        } catch (error) {
            console.log(error)
            res.json({ err: "something went wrong" + error })
        }
    }
    else {
        try {
            const profilepic = {
                data: fs.readFileSync('profilepic/' + defaultProfile),
                contentType: "image/png"
            }
            const profilepicData = new user_profilepic({
                user_id: req.params.user_id,
                user_name: req.body.user_name,
                profilepic: {
                    data: fs.readFileSync('profilepic/' + defaultProfile),
                    contentType: "image/png"
                }
            })
            profilepicData.save()
            res.json({ msg: "done" })
        } catch (error) {
            res.json({ err: "something went wrong" + error })
        }
    }
});

route.post('/update/:user_id', profilepic.single('image'), async (req, res) => {
    try {
        await user_profilepic.findOneAndUpdate({user_id : req.params.user_id},{profilepic: {data: fs.readFileSync('profilepic/' + req.file.filename)},contentType: "image/png"
        })
        res.json({msg : "profile updated  successfully"})
    } catch (error) {
        console.log(error)
        res.json({ err: "something went wrong" + error })
    }
})
module.exports = route