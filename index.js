var moment = require('moment');
require('moment-precise-range-plugin');
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT | 3000;
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())
app.get('/getPeriod', (req, res) => {

    try {
        var m1 = moment('2015-09-07 09:30:00', 'YYYY-MM-DD HH:mm:ss');
        var m2 = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
        res.send(moment.preciseDiff(m1, m2, true))
    }
    catch (err) {
        res.json(err);
    }
})


app.post('/sendMail', (req, res, next) => {
    try {
        
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
               ciphers:'SSLv3'
            },
            auth: {
                user: 'aswink.dev@outlook.com',
                pass: 'developer!@#123'
            }
        });
        var mailOptions = {
            from: 'aswink.dev@outlook.com',//replace with your email
            to: ['mykrishna16@gmail.com', 'admin@aswinkv.com'],//replace with your email
            subject: req.body.subject,
            html: `<h2> ${req.body.name} </h2>
                <h3> ${req.body.email} </h3>
                <h3> ${req.body.mobile} </h3><br><hr>
                <p>${req.body.content} </p>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json(error) // if error occurs send error as response to client
            }
            else {
                console.log('Email sent: ' + info.response);
                res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
            }
        });
    }
    catch (err) {

        res.json(err);
    }

})
app.listen(port, () => { })


