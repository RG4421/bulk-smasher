const router = require('express').Router();
const timer = require('execution-time')();
const dateFormat = require('dateformat');
const creds = require('../client_secret.json');

// Utility functions
const auth = require('./utility-functions/auth');
const parse = require('./utility-functions/csv-parser');
const fetch = require('./utility-functions/fetch');
const fileHandler = require('./utility-functions/file-handler');

// Functions
const deleteFunc = require('./delete-functions/delete');

/*
------------
  ALL TAGS
------------
*/
router.route('/allTags').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const tagIds = await fetch.tagId(authToken);
        const deletedTags = await deleteFunc.deleteAll(authToken, tagIds);

        let log = deletedTags.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - ALL TAGS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'DELETE', 'ALL TAGS', deletedTags.runCount, time);

        return res.status(200).json({
            message: `All tags deleted - (Runtime: ${time.words})`,
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
------------
  TAG LIST
------------
*/
router.route('/tagList').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const tagIds = await fetch.tagId(authToken);
        const deletedTags = await deleteFunc.deleteList(authToken, fileContents, tagIds);

        let log = deletedTags.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - TAG LIST (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'DELETE', 'TAG LIST', deletedTags.runCount, time);

        return res.status(200).json({
            message: `Tag list deleted - (Runtime: ${time.words})`,
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
        const deletedItems = await deleteFunc.items(authToken, csvData);

        let log = deletedItems.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'DELETE', 'ITEMS', deletedItems.runCount, time);

        return res.status(200).json({
            message: `Items deleted  - (Runtime: ${time.words})`,
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
----------------
  STREAM ITEMS
----------------
*/
router.route('/streamItems').post(async (req, res) => {
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
        const deletedStreamsItems = await deleteFunc.deleteStreamItems(authToken, csvData);

        let log = deletedStreamsItems.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - STREAM ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'DELETE', 'STREAM ITEMS', deletedStreamsItems.runCount, time);

        return res.status(200).json({
            message: `Stream items deleted - (Runtime: ${time.words})`,
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
----------------
  HIDDEN ITEMS
----------------
*/
router.route('/hiddenItems').post(async (req, res) => {
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
        const hiddenItems = await fetch.hiddenStreamItems(authToken, csvData);
        const deletedItems = await deleteFunc.deleteStreamItems(authToken, hiddenItems);

        let log = deletedItems.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - HIDDEN ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'DELETE', 'HIDDEN ITEMS', deletedItems.runCount, time);

        return res.status(200).json({
            message: `Hidden stream items deleted  - (Runtime: ${time.words})`,
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
----------------
  PAST CONTENT
----------------
*/
router.route('/pastItems').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const selectDate = req.body.selectDate;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);
        
        const pastContent = await fetch.pastContentItems(authToken, selectDate);
        const deletedPast = await deleteFunc.deleteItems(authToken, pastContent);

        let log = deletedPast.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - PAST ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'DELETE', 'PAST ITEMS', deletedPast.runCount, time);

        return res.status(200).json({
            message: `Past stream items deleted  - (Runtime: ${time.words})`,
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
        const deletedStreams = await deleteFunc.streams(authToken, csvData);

        let log = deletedStreams.logObj;
        const time = timer.stop();
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - STREAMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'DELETE', 'STREAMS', deletedStreams.runCount, time);

        return res.status(200).json({
            message: `Stream list deleted  - (Runtime: ${time.words})`,
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

module.exports = router;