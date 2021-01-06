const fs = require('fs');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const uniqid = require('uniqid');

require('dotenv').config();

async function createLog (data) {

    let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const id = uniqid();

    // Local testing:
    //fs.writeFile(`../public/server-logs/BulkSmasherLog-${id}.txt`, data, function (err) {
    fs.writeFile(`./build/server-logs/BulkSmasherLog-${id}.txt`, data, function (err) {
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
                    text: `Error generating log for Bulk Smasher.\n\n${err}`
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
            console.log(`${dateTime} - LOG FILE BulkSmasherLog-${id}.txt CREATED\n`);
        }
    });
    return id;
}

module.exports = {
    createLog
}