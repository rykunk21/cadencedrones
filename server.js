const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.post('/contact', (req, res) => {
    sendMail = require('./util/mail.js')
    name = req.body.name;
    email = req.body.email;
    message = req.body.message;


    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        // please select captcha
        return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
      }
      var secretKey = "6LcZm6UgAAAAAPpHwuRiXNfcYCjMDgBtjNuKacKN";
      // req.connection.remoteAddress will provide IP address of connected user.
      var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
      // Hitting GET request to the URL, Google will respond with success or error scenario.
      request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            // decline form submission
          return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
          
        }
        //success
        sendMail(name,email,message)
        console.log('Email Sent')
        
        res.redirect('/confirmEmail.html')
      });



    
    
})

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})


