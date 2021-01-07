const router = require('express').Router();
const timer = require('execution-time')();
const dateFormat = require('dateformat');
const creds = require('../client_secret.json');

// Utility functions
const auth = require('./utility-functions/auth');
const parse = require('./utility-functions/csv-parser');
const compare = require('./utility-functions/compare');
const fetch = require('./utility-functions/fetch');
const fileHandler = require('./utility-functions/file-handler');

// Functions
const create = require('./create-functions/create');
const update = require('./update-functions/update');

/*
-----------
   TAGS
-----------
*/
router.route('/tags').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const searchKey = req.body.searchKey;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);
        
        const newTags = await parse.CSV(fileContents, searchKey);
        const existingTags = await fetch.tagId(authToken);
        const compareTags = await compare.tags(existingTags, newTags);
        const createdTags = await create.tags(authToken, compareTags);
        const allTags = await fetch.tagId(authToken);
        const updatedTags = await update.tagItems(authToken, newTags, allTags);

        let log = createdTags.logObj.concat(updatedTags.logObj);
        const execution = createdTags.runCount + updatedTags.runCount;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - TAGS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'CREATE', 'TAGS', execution, time);

        return res.status(201).json({
            message: `Tags successfully created and applied (${time.words})`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });
        
    } catch (e) {
        console.log(e);
        const errorMessage = `${e.message}\n`;
        return res.status(400).json({
            message: errorMessage
        });
    }
});

/*
-----------
  STREAMS
-----------
*/
router.route('/streams').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const searchKey = req.body.searchKey;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents, searchKey);
        const createdStreams = await create.streams(authToken, csvData);

        let log = createdStreams.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - STREAMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'CREATE', 'STREAMS', createdStreams.runCount, time);

        return res.status(201).json({
            message: `Streams successfully created and populated (${time.words})`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });

    } catch (e) {
        console.log(e);
        const errorMessage = `${e.message}\n`;
        return res.status(400).json({
            message: errorMessage
        });
    }
});

/*
-----------
   USERS
-----------
*/
router.route('/users').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const searchKey = req.body.searchKey;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents, searchKey);
        const newUsers = await create.users(authToken, csvData);
        const existingUsers = await fetch.users(authToken);
        const userGroups = await fetch.groups(authToken);
        const compareUsers = await compare.users(existingUsers, newUsers.user, userGroups);
        const updatedUsers = await update.groups(authToken, compareUsers);

        let log = newUsers.logObj.concat(updatedUsers.logObj);
        let executions = newUsers.runCount + updatedUsers.runCount;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - USERS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));
        
        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'CREATE', 'USERS', executions, time);

        return res.status(201).json({
            message: `User profiles created and groups assigned (${time.words})`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });

    } catch (e) {
        console.log(e);
        const errorMessage = `${e.message}\n`;
        return res.status(400).json({
            message: errorMessage
        });
    }
});

/*
-----------
   ITEMS
-----------
*/
router.route('/items').post(async (req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;
    const searchKey = req.body.searchKey;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents, searchKey);
        const createdItems = await create.items(authToken, csvData);

        let log = createdItems.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'CREATE', 'ITEMS', createdItems.runCount, time);

        return res.status(201).json({
            message: `Items created and published (${time.words})`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });

    } catch (e) {
        console.log(e);
        const errorMessage = `${e.message}\n`;
        return res.status(400).json({
            message: errorMessage
        });
    }
});

router.route('/pdfs').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISignature = req.body.APISecret;
    const hubId = req.body.hubId;
    const fileContents = req.body.fileContents;
    const searchKey = req.body.searchKey;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        const csvData = await parse.CSV(fileContents, searchKey);
        const createdPDFs = await create.pdfs(APIKey, APISignature, hubId, csvData);

        let log = createdPDFs.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - PDFS (Runtime ${time.words}) ---\n\n- HUBS - \nID ${hubId}\n\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'CREATE', 'PDFS', createdPDFs.runCount, time);

        return res.status(201).json({
            message: `PDFs uploaded to Hub ${hubId} (${time.words})`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });

    } catch (e) {
        console.log(e);
        const errorMessage = `${e.message}\n`;
        return res.status(400).json({
            message: errorMessage
        });
    }
});

router.route('/test').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    //const fileSize = req.body.fileSize;
    const searchKey = req.body.searchKey;
    dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        await auth.authenticateCredsV2(APIKey, APISecret);
        //let fetchHub = await fetch.getHub(authToken);
        const data = await parse.CSV(fileContents, searchKey);

        console.log(data);

        let time = timer.stop();
        
        return res.status(201).json({
                message: `TEST CALL RAN (${time.words})`,
                log_name: `BulkSmasherLog.txt`
            });

    } catch (e) {
        console.log(e);
        const errorMessage = `${e.message}\n`;
        return res.status(400).json({
            message: errorMessage
        });
    }   
});

module.exports = router;

// LOGGING

// let logId = await fileHandler.createLog(`--- TEST TEST TEST (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n`);

        // let executions = 790;
        // time = {
        //     name: 'default',
        //     time: 145439.30117,
        //     words: '2.42 min',
        //     preciseWords: '2.4166666666666665 min',
        //     verboseWords: '2 minutes 25 seconds 439 milliseconds 301 microseconds 170 nanoseconds'
        // }

        //await auth.googleAuth(creds, dateTime, logId, 'Test Type', 'Test Op', executions, time);
