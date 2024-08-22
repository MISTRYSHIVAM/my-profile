const express = require('express');
const routes = express.Router();
const { body , validationResult } = require('express-validator');
const user_mst = require('../models/User_authentication');
const nodemailer = require("nodemailer");

routes.post('/',[
    body('email','Please enter email').notEmpty(),
    body('email','Please enter Proper email').isEmail(),  
    body('user_name','Please enter user_name').notEmpty()
    ] ,(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({success : false , emessage: errors.array()[0].msg });
    }
    const email = async () =>{

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
        port: 465,
        secure : true,
        auth: {
            user: 'shivammistry2003@gmail.com',
            pass: 'cazkngeficyfbjzi'
        }
    });
    
    let info = await transporter.sendMail({
        from: '"shivam mistry 👻" <shivammistry2003@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Change password", // Subject line
        text: "Hi abhay",
        html : "<b>"+req.body.user_name+" your OTP is "+OTP +"<b/>"
    });
    console.log("Message sent: %s", info.messageId);
    }
    let OTP = Math.floor(Math.random() * 100 - 1 ) + 100
    email()
    user_mst.findOne({ $and : [{email : req.body.email},{user_name : req.body.user_name}]
    }).then(user_mst =>{ (user_mst)?res.json({success : true , user : user_mst , message : "found" , otp : OTP}):res.json({success : false , emessage : "Email user_name not matched"})})
})


module.exports = routes;