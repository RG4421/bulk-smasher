const express    = require('express');
const app        = express();
const cors       = require('cors');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const path       = require('path');

// Certs
// const key     = fs.readFileSync('./key.pem');
// const cert    = fs.readFileSync('./cert.pem');
// const server  = https.createServer({key: key, cert: cert }, app);
const port = process.env.HTTP_PORT || 4001;

require('dotenv').config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const createRouter = require('./routes/create-router');
const updateRouter = require('./routes/update-router');
const deleteRouter = require('./routes/delete-router');

// Middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, '../build')));
app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

// Server deployment
app.listen(port, function(err) 
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
                text: `Error deploying Bulk Smasher server\nError: ${err}`
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
        console.log('Server deployed...listening at port:' + port + '\n');
    }
});