const fs = require('fs');
const dateFormat = require('dateFormat');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function createLog (data) {

    let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    fs.writeFile(`./BulkSmasherLog-${dateTime}.txt`, data, function (err) {
        
        if (err) {

            let transporter;
            let mailOptions;
    
            try {
                transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: username,
                        pass: password
                    }
                });
                
                mailOptions = {
                    from: "larsenfriis1@gmail.com",
                    to: "larsen.friis@uberflip.com",
                    subject: `Bulk Smasher - Create Log function failed on ` + dateTime,
                    text: `Error generating log for Bulk Smasher\nError: ${err}`
                };
    
            } catch (err) {
                console.log(dateTime + err);
            }

            transporter.sendMail(mailOptions, function(error) {
                if (error) {
                    throw error;
                } else {
                    console.log("Email successfully sent at " + dateTime);
                }
            });
        }
        else {
            console.log(`${dateTime} - LOG FILE 'BulkSmasherLog-${dateTime}.txt' CREATED\n`);
        }
    });
}

module.exports = {
    createLog
}