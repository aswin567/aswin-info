var moment = require('moment');
require('moment-precise-range-plugin');
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const express = require('express')
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

app.get('/getPeriod', (req, res) => {
    
    try{
    var m1 = moment('2015-09-07 09:30:00', 'YYYY-MM-DD HH:mm:ss');
    var m2 = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
    //res.send(moment.preciseDiff(m1, m2, true))
    res.send({as:'sassa'});
    }
    catch(err){
        res.send(err);
    }
})

app.post('/sendMail', async (req, res) => {
    try{
        const emailDetails = {
            fromEmail: req.body.email,
            name: req.body.name,
            subject: req.body.subject,
            text: req.body.content,
    
        }
        // create reusable transporter object using the default SMTP transport 
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            }
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${emailDetails.name}" <${emailDetails.fromEmail}>`, // sender address
            to: "admin@aswinkv.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?"
        });
        if(info){
            res.json('Message send sucessfully');
        }
    }
    catch(err){
        throw err;
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


