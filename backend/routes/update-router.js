const router = require('express').Router();
const timer = require('execution-time')();
const dateFormat = require('dateFormat');
const dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

// Utility functions
const auth  = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const fetch = require('./utilities/fetch');
const fileHandler = require('./utilities/file-handler');

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
    const newDate = dateFormat(selectDate, "yyyy-mm-dd")

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const pastContent = await fetch.pastContentItems(authToken, selectDate);
        const updatedContent = await update.pastContent(authToken, pastContent, selectValue);

        let log = updatedContent;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - HIDE PAST CONTENT (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Content before ${newDate} set to hidden - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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
    const newDate = dateFormat(selectDate, "yyyy-mm-dd")

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const pastContent = await fetch.pastContentItems(authToken, selectDate);
        const updatedContent = await update.pastContent(authToken, pastContent, selectValue);

        let log = updatedContent;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - SHOW PAST CONTENT (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Content before ${newDate} set to show - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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
    
    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const updatedAuthors = await update.author(authToken, csvData);

        let log = updatedAuthors;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ITEM AUTHOR (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Author of items updated - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const updatedSEO = await update.seo(authToken, csvData);

        let log = updatedSEO;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ITEM SEO (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`SEO metadata of items updated - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const updatedMetadata = await update.metadata(authToken, csvData);

        let log = updatedMetadata;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ITEM METADATA (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`SEO metadata of items updated - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const updatedStreams = await update.streams(authToken, csvData);

        let log = updatedStreams;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - POPULATE STREAMS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Streams populated with new items - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const blogItems = await fetch.allBlogItems(authToken, uniqueSearch);
        const updateItems = await update.allEmbedContent(authToken, blogItems, itemSearch, itemReplace);

        let log = updateItems;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - ALL ITEMS EMBEDDED CONTENT (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Blog items updated with new embed content - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
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

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const streamItems = await fetch.streamsBlogItems(authToken, streamId, uniqueSearch);
        const updateItems = await update.streamEmbedContent(authToken, streamItems, itemSearch, itemReplace);

        let log = updateItems;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE - STREAM ${streamId} ITEMS EMBEDDED CONTENT (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(200).json(`Stream ${streamId} blog items updated with new content - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
        return res.status(400).json({
            message: errorMessage
        });
    }
});

module.exports = router;