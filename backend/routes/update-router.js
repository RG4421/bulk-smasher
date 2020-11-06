const router = require('express').Router();
const timer = require('execution-time')();
const dateFormat = require('dateformat');
const creds = require('../client_secret.json');

// Utility functions
const auth  = require('./utility-functions/auth');
const parse = require('./utility-functions/csv-parser');
const fetch = require('./utility-functions/fetch');
const fileHandler = require('./utility-functions/file-handler');

// Functions
const update = require('./update-functions/update');

/*
-------------------
 HIDE PAST CONTENT
-------------------
*/
router.route('/hidePastContent').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const selectDate = req.body.selectDate;
    const selectValue = req.body.selectValue;
    const newDate = dateFormat(selectDate, "yyyy-mm-dd");
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const pastContent = await fetch.pastContentItems(authToken, selectDate);
        const updatedContent = await update.pastContent(authToken, pastContent, selectValue);

        let log = updatedContent.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - HIDE PAST CONTENT (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'HIDE PAST CONTENT', updatedContent.runCount, time.words);

        return res.status(200).json({
            message: `Content before ${newDate} set to hidden - Runtime: ${time.words}`,
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
-------------------
 SHOW PAST CONTENT
-------------------
*/
router.route('/showPastContent').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const selectDate = req.body.selectDate;
    const selectValue = req.body.selectValue;
    const newDate = dateFormat(selectDate, "yyyy-mm-dd");
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const pastContent = await fetch.pastContentItems(authToken, selectDate);
        const updatedContent = await update.pastContent(authToken, pastContent, selectValue);

        let log = updatedContent;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - SHOW PAST CONTENT (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'SHOW PAST CONTENT', updatedContent.runCount, time.words);

        return res.status(200).json({
            message: `Content before ${newDate} set to show - Runtime: ${time.words}`,
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
---------
  ITEMS
---------
*/
router.route('/items').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const updatedItems = await update.items(authToken, csvData);

        let log = updatedItems.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - UPDATE ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'ITEMS', updatedItems.runCount, time.words);

        return res.status(200).json({
            message: `Items updated - Runtime: ${time.words}`,
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
-----------------
   ITEM AUTHOR
-----------------
*/
router.route('/author').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");
    
    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const updatedAuthors = await update.author(authToken, csvData);

        let log = updatedAuthors.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ITEM AUTHOR (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'ITEM AUTHOR', updatedAuthors.runCount, time.words);

        return res.status(200).json({
            message: `Author of items updated - Runtime: ${time.words}`,
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
----------
   SEO
----------
*/
router.route('/seo').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const updatedSEO = await update.seo(authToken, csvData);

        let log = updatedSEO.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ITEM SEO (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'ITEM SEO', updatedSEO.runCount, time.words);

        return res.status(200).json({
            message: `SEO metadata of items updated - Runtime: ${time.words}`,
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
-------------
   METADATA
-------------
*/
router.route('/metadata').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const updatedMetadata = await update.metadata(authToken, csvData);

        let log = updatedMetadata.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ITEM METADATA (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'ITEM METADATA', updatedMetadata.runCount, time.words);

        return res.status(200).json({
            message: `SEO metadata of items updated - Runtime: ${time.words}`,
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
-------------------
  POPULATE STEAMS
-------------------
*/
router.route('/populateStreams').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const updatedStreams = await update.streams(authToken, csvData);

        let log = updatedStreams.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - POPULATE STREAMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'POPULATE STREAMS', updatedStreams.runCount, time.words);

        return res.status(200).json({
            message: `Streams populated with new items - Runtime: ${time.words}`,
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
-------------------
    ITEM CONTENT
-------------------

<p><iframe allow="autoplay; encrypted-media" allowfullscreen="" frameborder="0" height="471" src="https://www.youtube/embed

https://www.youtube

https://www.youtube-nocookie

*/
router.route('/itemContent').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const uniqueSearch = req.body.uniqueSearch;
    const itemSearch = req.body.itemSearch;
    const itemReplace = req.body.itemReplace;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const blogItems = await fetch.allBlogItems(authToken, uniqueSearch);
        const updateItems = await update.allEmbedContent(authToken, blogItems, itemSearch, itemReplace);

        let log = updateItems.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ALL ITEMS SOURCE CONTENT (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'ALL ITEMS SOURCE CONTENT', updateItems.runCount, time.words);

        return res.status(200).json({
            message: `Blog items updated with new embed content - Runtime: ${time.words}`,
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
----------------------
  STREAM ITEM CONTENT
----------------------
*/
router.route('/streamItemContent').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const uniqueSearch = req.body.uniqueSearch;
    const streamId = req.body.streamId;
    const itemSearch = req.body.itemSearch;
    const itemReplace = req.body.itemReplace;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const streamItems = await fetch.streamsBlogItems(authToken, streamId, uniqueSearch);
        const updateItems = await update.streamEmbedContent(authToken, streamItems, itemSearch, itemReplace);

        let log = updateItems.logObj;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - STREAM ${streamId} ITEMS SOURCE CONTENT (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'STREAM ITEMS SOURCE CONTENT', updateItems.runCount, time.words);

        return res.status(200).json({
            message: `Stream ${streamId} blog items updated with new content - Runtime: ${time.words}`,
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

router.route('/tagSearch').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const tagSearch = req.body.tagSearch;
    const canonicalAppend = req.body.canonAppend;
    const dateTime = dateFormat(new Date(), "yyyy-mm-dd");

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const searchItems = await fetch.getTaggedItems(authToken, tagSearch);
        const updatedItems = await update.appendCanonical(authToken, searchItems.resArr, canonicalAppend);

        let log = searchItems.logObj.concat(updatedItems.logObj);
        let executions = searchItems.runCount + updatedItems.runCount;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - TAG SEARCH ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        // Appending data to Google Drive
        await auth.googleAuth(creds, dateTime, logId, 'UPDATE', 'TAG SEARCH ITEMS', executions, time.words);

        return res.status(200).json({
            message: `Tagged items updated - Runtime: ${time.words}`,
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