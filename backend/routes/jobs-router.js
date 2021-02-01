const router = require('express').Router();
const uniqid = require('uniqid');
const dateFormat = require('dateformat');

// AWS CONFIG
const AWS = require('aws-sdk');
const DB = require('../db_config');

// FUNCTIONS
const auth = require('./utility-functions/auth');
const fetch = require('./utility-functions/fetch');

router.route('/create').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const fileSize = req.body.fileSize;
    const searchKey = req.body.searchKey;
    const hubId = req.body.hubId;
    const operatorType = req.body.operatorType;
    const selectValue = req.body.selectValue;
    const email = req.body.email
    
    try {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        const hub = await fetch.getHubId(authToken);
        const _id = uniqid().toString();
        const jobGroup = hub[0].id.toString();
        const status = 'Queued';
        const date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        AWS.config.update(DB.aws_remote_config);
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        const dbObject = {
            _id,
            date,
            jobGroup,
            status,
            operatorType,
            selectValue,
            APIKey,
            APISecret,
            fileContents,
            fileSize,
            searchKey,
            hubId,
            email
        };

        var params = {
            TableName: DB.bulksmasher_queue,
            Item: dbObject
        };
    
        // Call DynamoDB to add the item to the table
        dynamoDB.put(params, function (err, data) {
            if (err) {
                return res.send({
                    success: false,
                    message: err
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Job submitted to queue!',
                });
            }
        });

    } catch (e) {
        console.log('ERROR');
    }
});

router.route('/view').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;

    try {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        const hub = await fetch.getHubId(authToken);
        const hubName = hub[0].name;
        const jobGroup = hub[0].id;

        AWS.config.update(DB.aws_remote_config);
    
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
        const params = {
            ExpressionAttributeNames: {
                "#D": "date",
                "#ID": "_id",
                "#JG": "jobGroup",
                "#FS": "fileSize",
                "#OP": "operatorType",
                "#SV": "selectValue",
                "#S": "status"
            },
            ExpressionAttributeValues: {
                ":job": `${jobGroup}`
            },
            FilterExpression: "#JG = :job",
            ProjectionExpression: "#D, #ID, #JG, #FS, #OP, #SV, #S",
            TableName: DB.bulksmasher_jobs,
        };

        dynamoDB.scan(params, function (err, data) {
    
            if (err) {
                console.log(err)
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: `Jobs fetched`,
                    data: data.Items,
                    hubName: hubName
                });
            }
        });

    } catch (e) {
        console.log('ERROR');
    }
});

module.exports = router;