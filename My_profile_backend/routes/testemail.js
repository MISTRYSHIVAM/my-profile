const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.get('/', async (req, res) => {
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
        to: "abhaykevat23@gmail.com", // list of receivers
        subject: "Testing email with nodemailer", // Subject line
        text: "Hi abhay",
        html : "<b>Hi .... email....done<b/>"
    });
    console.log("Message sent: %s", info.messageId);
    res.send("send")
    }
    email()
})

module.exports = router

