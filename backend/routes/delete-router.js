const router = require('express').Router();
const timer = require('execution-time')();

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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const tagIds = await fetch.tagId(authToken);
        const deletedTags = await deleteFunc.deleteAll(authToken, tagIds);

        let log = deletedTags;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - ALL TAGS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`All tags deleted - Runtime: ${time.words}`);
        
    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR  -  ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const tagIds = await fetch.tagId(authToken);
        const deletedTags = await deleteFunc.deleteList(authToken, fileContents, tagIds);

        let log = deletedTags;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - TAG LIST (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Tag list deleted - Runtime: ${time.words}`);
        
    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR  -  ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        
        const csvData = await parse.CSV(fileContents);
        const deletedStreamsItems = await deleteFunc.deleteStreamItems(authToken, csvData);

        let log = deletedStreamsItems;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - STREAM ITEMS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Stream items deleted - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR  -  ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        
        const csvData = await parse.CSV(fileContents);
        const hiddenItems = await fetch.hiddenStreamItems(authToken, csvData);
        const deletedItems = await deleteFunc.deleteStreamItems(authToken, hiddenItems);

        let log = deletedItems;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - HIDDEN ITEMS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Hidden stream items deleted - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR  -  ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        
        const pastContent = await fetch.pastContentItems(authToken, selectDate);
        const deletedPast = await deleteFunc.deleteItems(authToken, pastContent);

        let log = deletedPast;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - PAST ITEMS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Past stream items deleted - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR  -  ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const deletedStreams = await deleteFunc.streams(authToken, csvData);

        let log = deletedStreams;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - DELETE - STREAMS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Stream list deleted - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR  -  ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
        return res.status(400).json({
            message: errorMessage
        });
    }
});

module.exports = router;