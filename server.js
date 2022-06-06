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
    sendMail(name,email,message)
    res.redirect('/confirmEmail.html')
})

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})


