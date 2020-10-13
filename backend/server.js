const express    = require('express');
const app        = express();
const https      = require('https');
const cors       = require('cors');
const fs         = require('fs');
const dateFormat = require('dateFormat');
const nodemailer = require('nodemailer');

// Certs
const key     = fs.readFileSync('./key.pem');
const cert    = fs.readFileSync('./cert.pem');
const server  = https.createServer({key: key, cert: cert }, app);
const port    = 8080;

require('dotenv').config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const createRouter = require('./routes/create-router');
const updateRouter = require('./routes/update-router');
const deleteRouter = require('./routes/delete-router');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

// Server deployment
server.listen(port, function(err) 
{
    if (err) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: username,
                    pass: password
                }
            });
            
            let mailOptions = {
                from: "larsenfriis1@gmail.com",
                to: "larsen.friis@uberflip.com",
                subject: `Bulk Smasher - CRITICAL SERVER ERROR ` + dateTime,
                text: `Error deploying Express server\nError: ${err}`
            };
            
            transporter.sendMail(mailOptions, function(err) {
                if (err) {
                    throw err;
                } else {
                    console.log("Email successfully sent at " + dateTime);
                }
            });

        } catch (err) {
            console.log(dateTime + err);
        }
    } else {
        console.log('Secure server deployed...\nListening at https://localhost:' + port + '\n');
    }
});