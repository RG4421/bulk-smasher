const AWS = require('aws-sdk');
const DB = require('./db_config');
const delay = require('delay');
const nodemailer = require('nodemailer');
const dateFormat = require('dateformat');
require('dotenv').config();

async function putInWork () {

    try {
        console.log('\n⚠️  WORKER: checking queue...\n')
        AWS.config.update(DB.aws_remote_config);
    
        const dynamoDB = new AWS.DynamoDB.DocumentClient();

        const { Count, Items } = await getAllQueuedJobs(dynamoDB);

        // Checking if queue has jobs for worker
        if (Count !== 0) {
            console.log('⚠️  WORKER: Jobs found, time to work!\n')

            for (let i = 0; i < Items.length; i++) {

                /*
                DONE - DELAY 30 SECONDS IN BETWEEN EACH JOB

                1. DONE - Get next job in queue
                2. DONE - Insert job into jobs table - update status to in progress
                3. Process job
                4. DONE - Update status to complete
                5. DONE - Email client that task is complete
                6. DONE - Pop job from queue
                ... next job
                */

                await delay(10000);
                const job = await getNextJob(dynamoDB, Items[i]._id);
                const currentJob = job.Items[0];
                await insertToJobsDB(dynamoDB, currentJob);

                // call Bulk Smasher API

                await jobsDone(dynamoDB, currentJob._id);
                const updatedJob = await getUpdatedJob(dynamoDB, currentJob._id);
                await popJob(dynamoDB, currentJob._id)
                await youveGotMail(
                    updatedJob.Items[0].email, 
                    updatedJob.Items[0]._id, 
                    updatedJob.Items[0].date, 
                    updatedJob.Items[0].status,
                    '1234',
                    '5678'
                );
            }
        } else {
            console.log("Worker going back to sleep...😴!\n");
        }

    } catch (e) {
        console.log('Error putting in work: ' + e)
    }
};

async function getAllQueuedJobs (dynamoDB) {

    try {
        const params = {
            TableName: DB.bulksmasher_queue,
        };
        
        const data = await dynamoDB.scan(params).promise();
        console.log(`⚠️  WORKER: Fetched ${data.Count} ITEM(S) from queue\n`);
        return data;
    } catch (e) {
        console.log('Error getting all queued jobs: ' + e);
    }
}

async function getNextJob (dynamoDB, id) {

    try {
        const params = {
            ExpressionAttributeNames: {
                "#D" : "date",
                "#ID": "_id",
                "#JG": "jobGroup",
                "#FS": "fileSize",
                "#OP": "operatorType",
                "#SV": "selectValue",
                "#S" : "status",
                "#E" : "email"
            },
            ExpressionAttributeValues: {
                ":id": `${id}`
            },
            FilterExpression: "#ID = :id",
            ProjectionExpression: "#D, #ID, #JG, #FS, #OP, #SV, #S, #E",
            TableName: DB.bulksmasher_queue,
        };

        const data = await dynamoDB.scan(params).promise();
        console.log(`\nProcessing job ID: ${id}`);
        return data;

    } catch (e) {
        console.log('Error getting job based on ID ' + e);
    }
}

async function getUpdatedJob (dynamoDB, id) {

    try {
        const params = {
            ExpressionAttributeNames: {
                "#D" : "date",
                "#ID": "_id",
                "#JG": "jobGroup",
                "#FS": "fileSize",
                "#OP": "operatorType",
                "#SV": "selectValue",
                "#S" : "status",
                "#E" : "email"
            },
            ExpressionAttributeValues: {
                ":id": `${id}`
            },
            FilterExpression: "#ID = :id",
            ProjectionExpression: "#D, #ID, #JG, #FS, #OP, #SV, #S, #E",
            TableName: DB.bulksmasher_jobs,
        };

        const data = await dynamoDB.scan(params).promise();
        return data;

    } catch (e) {
        console.log('Error getting updated job based on ID ' + e);
    }
}

async function insertToJobsDB (dynamoDB, object) {
    const date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    object.status = "In Progress"
    object.date = date

    try {
        const params = {
            TableName: DB.bulksmasher_jobs,
            Item: object
        };

        const data = await dynamoDB.put(params).promise();
        console.log(`Item ${object._id} inserted into JOBS table`);
        return data;

    } catch (e) {
        console.log('Error inserting into status table: ' + e);
    }
}

async function popJob (dynamoDB, id) {

    try {    
        const params = {
            Key: {
                "_id": `${id}`,
            },
            TableName: DB.bulksmasher_queue,
        };

        await dynamoDB.delete(params).promise();
        console.log(`Item ${id} popped from QUEUE`);

    } catch (e) {
        console.log('Error deleting item from queue ' + e);
    }
}

async function jobsDone (dynamoDB, id) {
    const date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    const newStatus = "Completed";

    try {
        const params = {
            TableName: DB.bulksmasher_jobs,
            Key: {
                "_id": id
            },
            UpdateExpression: "SET #S = :s, #D = :d",
            ExpressionAttributeNames: {
                "#S": "status",
                "#D": "date"
            },
            ExpressionAttributeValues: {
                ":s": newStatus,
                ":d": date
            },
        };
        
        const data = await dynamoDB.update(params).promise();
        console.log(`Item ${id} status updated!`)
       

        return data;

    } catch (e) {
        console.log('Error updating status: ' + e);
    }

}

async function youveGotMail (email, id, date, status, runtime, executions) {
    
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USERNAME,
                pass: process.env.PASSWORD
            }
        });

        let emailTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head><!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><meta content="width=device-width" name="viewport"/><!--[if !mso]><!--><meta content="IE=edge" http-equiv="X-UA-Compatible"/><!--<![endif]--><title></title><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/><!--<![endif]--><style type="text/css">		body {			margin: 0;			padding: 0;		}		table,		td,		tr {			vertical-align: top;			border-collapse: collapse;		}		* {			line-height: inherit;		}		a[x-apple-data-detectors=true] {			color: inherit !important;			text-decoration: none !important;		}	</style><style id="media-query" type="text/css">		@media (max-width: 520px) {			.block-grid,			.col {				min-width: 320px !important;				max-width: 100% !important;				display: block !important;			}			.block-grid {				width: 100% !important;			}			.col {				width: 100% !important;			}			.col_cont {				margin: 0 auto;			}			img.fullwidth,			img.fullwidthOnMobile {				max-width: 100% !important;			}			.no-stack .col {				min-width: 0 !important;				display: table-cell !important;			}			.no-stack.two-up .col {				width: 50% !important;			}			.no-stack .col.num2 {				width: 16.6% !important;			}			.no-stack .col.num3 {				width: 25% !important;			}			.no-stack .col.num4 {				width: 33% !important;			}			.no-stack .col.num5 {				width: 41.6% !important;			}			.no-stack .col.num6 {				width: 50% !important;			}			.no-stack .col.num7 {				width: 58.3% !important;			}			.no-stack .col.num8 {				width: 66.6% !important;			}			.no-stack .col.num9 {				width: 75% !important;			}			.no-stack .col.num10 {				width: 83.3% !important;			}			.video-block {				max-width: none !important;			}			.mobile_hide {				min-height: 0px;				max-height: 0px;				max-width: 0px;				display: none;				overflow: hidden;				font-size: 0px;			}			.desktop_hide {				display: block !important;				max-height: none !important;			}		}	</style><style id="icon-media-query" type="text/css">		@media (max-width: 520px) {			.icons-inner {				text-align: center;			}			.icons-inner td {				margin: 0 auto;			}		}	</style></head><body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"><!--[if IE]><div class="ie-browser"><![endif]--><table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td style="word-break: break-word; vertical-align: top;" valign="top"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]--><div style="background-color:transparent;"><div class="block-grid mixed-two-up" style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"><div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--><!--[if (mso)|(IE)]><td align="center" width="125" style="background-color:transparent;width:125px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--><div class="col num3" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 123px; width: 125px;"><div class="col_cont" style="width:100% !important;"><!--[if (!mso)&(!IE)]><!--><div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]--><div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;"><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Logo" border="0" class="center fixedwidth" src="https://i.ibb.co/c6hpsjH/logo.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;" title="Logo" width="100"/><!--[if mso]></td></tr></table><![endif]--></div><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]></td></tr></table><![endif]--><!--[if (mso)|(IE)]></td><td align="center" width="375" style="background-color:transparent;width:375px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--><div class="col num9" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 369px; width: 375px;"><div class="col_cont" style="width:100% !important;"><!--[if (!mso)&(!IE)]><!--><div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]--><table cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%"><tr style="vertical-align: top;" valign="top"><td align="center" style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; text-align: center; width: 100%;" valign="top" width="100%"><h2 style="color:#555555;direction:ltr;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:18px;font-weight:normal;line-height:150%;text-align:left;margin-top:0;margin-bottom:0;letter-spacing: .1em;padding-top: 7px;"><span style="background-color: #ffffff;">BULK SMASHER</br></span></h2></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%"><tbody><tr style="vertical-align: top;" valign="top"><td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]--><div style="color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"><div class="txtTinyMce-wrapper" style="line-height: 1.5; font-size: 12px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 18px;"><p style="line-height: 1.5; word-break: break-word; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; margin: 0;">Your Bulk Smasher job has successfully completed.</p><p style="line-height: 1.5; word-break: break-word; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; margin: 0;"> </p><p style="line-height: 1.5; word-break: break-word; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; margin: 0;"><strong>Job Details</strong></p><ul><li style="line-height: 1.5; word-break: break-word; mso-line-height-alt: NaNpx;">Completed at: <strong>${date}</strong></li><li style="line-height: 1.5; word-break: break-word; mso-line-height-alt: NaNpx;">Status: <strong>${status}</strong></li><li style="line-height: 1.5; word-break: break-word; mso-line-height-alt: NaNpx;">Runtime<strong>: ${runtime}</strong></li><li style="line-height: 1.5; word-break: break-word; mso-line-height-alt: NaNpx;">Total Tasks: <strong>${executions}</strong></li><li style="line-height: 1.5; word-break: break-word; mso-line-height-alt: NaNpx;"><a href="https://bulksmasher.uberflip.com/server-logs/BulkSmasherLog-${id}" rel="noopener" style="text-decoration: underline; color: #0068A5;" target="_blank">Click here</a> to view log details</li></ul><p style="line-height: 1.5; word-break: break-word; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; margin: 0;"> </p><p style="line-height: 1.5; word-break: break-word; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; margin: 0;">To view more details, visit <a href="https://bulksmasher.uberflip.com/jobs" rel="noopener" style="text-decoration: underline; color: #0068A5;" target="_blank">Jobs</a> and input your API credentials.</p></div></div><!--[if mso]></td></tr></table><![endif]--><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]></td></tr></table><![endif]--><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--></div></div></div><div style="background-color:transparent;"><div class="block-grid" style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"><div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--><!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--><div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;"><div class="col_cont" style="width:100% !important;"><!--[if (!mso)&(!IE)]><!--><div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]--><div></div><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]></td></tr></table><![endif]--><!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--></div></div></div><div style="background-color:transparent;"><div class="block-grid" style="min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"><div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"></br></br></body></html>`
        
        let mailOptions = {
            from: "larsenfriis1@gmail.com",
            to: `${email}`,
            subject: `Bulk Smasher Notification`,
            html: emailTemplate
        };
        
        transporter.sendMail(mailOptions, function(err) {
            if (err) {
                throw err;
            } else {
                console.log(`Email successfully sent to '${email}' at ${date}`);
            }
        });

    } catch (err) {
        console.log(date + err);
    }
}

putInWork();

module.exports = {
    putInWork
}