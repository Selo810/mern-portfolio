const express = require('express');
const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const router = express.Router();


router.post('/contact-form', (req, res) => {

// api key https://sendgrid.com/docs/Classroom/Send/api_keys.html 
var options = {
  auth: {
      api_key: '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'
  }
}
  
var mailer = nodemailer.createTransport(sgTransport(options));

const htmlEmail =  `
      <h3>Contact Details</h3>
      <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
      `

var email = {
  to: 'loserigne810@gmail.com',
  replyTo: req.body.email,
  from: 'portfolio@example.com',
  subject: 'Portfolio Contact',
  text: req.body.mongoose,
  html: htmlEmail
};

mailer.sendMail(email, function(err, res) {
  if (err) { 
      console.log(err) 
  }
  console.log(res);
});

  });

  module.exports = router;


