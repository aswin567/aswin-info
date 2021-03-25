var moment = require('moment');
require('moment-precise-range-plugin');
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT | 3000;
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())
app.get('/getPeriod', (req, res) => {
    
    try{
    var m1 = moment('2015-09-07 09:30:00', 'YYYY-MM-DD HH:mm:ss');
    var m2 = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
    res.send(moment.preciseDiff(m1, m2, true))
    }
    catch(err){
        res.send(err);
    }
})


app.post('/sendMail', (req, res, next) => {
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aswinkv.dev@gmail.com',//replace with your email
            pass: 'developer!@#123'//replace with your password
        }
    });
    var mailOptions = {
        from: 'aswinkv.dev@gmail.com',//replace with your email
        to: ['mykrishna16@gmail.com', 'admin@aswinkv.com'],//replace with your email
        subject: req.body.subject,
        html: `<h2> name:${req.body.name} </h2>
                <h3> email:${req.body.email} </h3>
                <h3> phonenumber:${req.body.mobile} </h3><br><hr>
                <p>${req.body.content} </p>`
    };
    /*
     Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
    call back as parameter
    */
    transporter.
    sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('error') // if error occurs send error as response to client
        }
        else {
            console.log('Email sent: ' + info.response);
            res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
        }
    });
})
app.listen(port, () => {})


