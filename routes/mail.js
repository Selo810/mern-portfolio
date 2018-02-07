const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();


router.post('/contact-form', (req, res) => {
    nodemailer.createTestAccount((err, account) =>{
      const htmlEmail =  `
      <h3>Contact Details</h3>
      <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
      `
  
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ptgjsoqjop4dvgkj@ethereal.email',
            pass: 's7J1YK6WTvzY2SgCPY'
        }
      });
  
      let mailOptions = {
        from: 'test@gmail.com',
        to: 'ptgjsoqjop4dvgkj@ethereal.email',
        replyTo: 'test@gmail.com',
        subject: 'Portfolio Contact',
        text: req.body.mongoose,
        html: htmlEmail
      }
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err){
          return console.log(err);
        }
  
        console.log('Message sent: %s', info.message);
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
  
      })
  
    });
  });

  module.exports = router;


