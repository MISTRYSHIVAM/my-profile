const express = require('express');
const route = express.Router();
const userPost = require('../models/User_post');

// route.put('/:post_id', async(req,res) => {
//     const postInfo = await userPost.findById({_id : req.params.post_id})
//     const like = postInfo.like.length
//     //console.log("like"+like)
//     if(!postInfo.like.includes(req.body.liker))
//     {
//         const newlike = like + 1;
//         await userPost.findByIdAndUpdate({_id : req.params.post_id},{$addToSet : {like : req.body.liker }})
//         .then(() => {
//             res.send({newlike : newlike})
//         })
//     }
//     else
//     {
//         const newlike = like - 1;
//         await userPost.findByIdAndUpdate({_id : req.params.post_id},{$pull : {like : req.body.liker }})
//         .then(() => {
//             res.send({newlike : newlike})
//         })
//     }
    
// })

route.put('/like/:post_id', async(req,res) => {
    await userPost.findByIdAndUpdate({_id : req.params.post_id},{$addToSet : {like : req.body.liker }})
    .then(async () => {
        const update = await userPost.findById({_id : req.params.post_id})
            res.send(update)
        })
    })

route.put('/dislike/:post_id', async(req,res) => {
    await userPost.findByIdAndUpdate({_id : req.params.post_id},{$pull : {like : req.body.liker }})
    .then(async () => {
        const update = await userPost.findById({_id : req.params.post_id})
            res.send(update)
        })
    })

module.exports=route