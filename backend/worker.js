const AWS = require('aws-sdk');
const DB = require('./db_config');
require('dotenv').config();

async function putInWork () {

    try {
        AWS.config.update(DB.aws_remote_config);
    
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
        const params = {
            TableName: DB.bulksmasher_queue,
        };
    
        dynamoDB.scan(params, function (err, data) {
            if (err) {
                console.log(err)

            } else {
                const { Count } = data;
                const jobQueue = data.Items;

                if (Count !== 0) {
                    console.log('Put em in the dirt')

                    // do work

                    for (let i = 0; i < jobQueue.length; i++) {
                        deleteJob(jobQueue[i]._id)

                        console.log(jobQueue[i]._id)
                    }
                }
            }
        });

    } catch (e) {
        console.log('ERROR');
    }
}

// next
async function insertJob () {

    try {
        AWS.config.update(DB.aws_remote_config);
    
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
        const params = {
            Key: {
                "_id": `${id}`,
            },
            TableName: DB.bulksmasher_queue,
        };

        dynamoDB.put(params, function (err, data) {
            if (err) {
                console.log('Error')
            } else {
                console.log('Inserted into status table')
            }
        });

    } catch (e) {
        console.log('ERROR Deleting Item from queue');
    }
}

async function deleteJob (id) {

    try {
        AWS.config.update(DB.aws_remote_config);
    
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
        const params = {
            Key: {
                "_id": `${id}`,
            },
            TableName: DB.bulksmasher_queue,
        };

        dynamoDB.delete(params, function (err, data) {
    
            if (err) {
                console.log(err)
            } else {
                console.log(`deleted item - ${data}`)
            }
        });

    } catch (e) {
        console.log('ERROR Deleting Item from queue');
    }
}

putInWork();

module.exports = {
    putInWork
}