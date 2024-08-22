const express = require('express');
const route = express.Router();

route.get('/',(req,res) => {
    console.log("hiiiii");
    res.send('welcome')
})

module.exports = route;