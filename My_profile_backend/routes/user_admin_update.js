const express = require('express');
const routes = express.Router();
const user_mst = require('../models/User_authentication');

routes.post('/',(req,res) => {
    user_mst.findOne({ user_name : req.body.name})
    .then(user_mst =>{ (user_mst)?res.json({success : true , user : user_mst , message : "Done"}):res.json({success : false , emessage : "error"})})
})


module.exports = routes;