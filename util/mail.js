const nodemailer = require('nodemailer');
const { EMAIL, PASS } = require('../config.json');

module.exports = function sendMail(name, email, message){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASS
        }
      });
      
      var mailOptions = {
        from: email,
        to: EMAIL,
        subject: `Web Inquiry from ${name}`,
        text: `Response email: ${email}\n\n${message}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}