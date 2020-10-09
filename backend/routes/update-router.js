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
    const fileContents = req.body.fileContents;
    const selectValue = req.body.selectValue;
    const newDate = dateFormat(selectDate, "yyyy-mm-dd")

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
        const updatedContent = await update.pastContent(authToken, pastContent, selectValue);

        console.log(pastContent);

        let log = updatedContent;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - UPDATE PAST CONTENT (Runtime ${time.words}) ---\n\n` + log.join(""));

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

router.route('/showPastContent').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const selectDate = req.body.selectDate;
    const fileContents = req.body.fileContents;
    const selectValue = req.body.selectValue;

    async function showPastContent () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');
            
            const csvData = await parse.CSV(fileContents);
            const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
            await update.pastContent(authToken, pastContent, selectValue);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Past content status set to show!');
        }
    }
    showPastContent();
});

router.route('/author').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    
    async function author () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            await update.author(authToken, csvData);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Author of items updated!');
        }
    }
    author();
});

router.route('/seo').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    
    async function seoMetadata () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            await update.seo(authToken, csvData);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('SEO metadata of items updated!');
        }
    }
    seoMetadata();
});

router.route('/metadata').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    
    async function itemMetadata () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            await update.metadata(authToken, csvData);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Metadata of items updated!');
        }
    }
    itemMetadata();
});

router.route('/populateStreams').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;
    
    async function populateStreams () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            await update.streams(authToken, csvData);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Streams populated with new items!');
        }
    }
    populateStreams();
});

router.route('/itemContent').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const uniqueSearch = req.body.uniqueSearch;
    const itemSearch = req.body.itemSearch;
    const itemReplace = req.body.itemReplace;

    async function itemContent () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const blogItems = await fetch.allBlogItems(authToken, uniqueSearch);
            const updateItems = await update.embedContent(authToken, blogItems, itemSearch, itemReplace);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('All blog items updated with new content!');
        }
    }
    itemContent();
});

router.route('/streamItemContent').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const uniqueSearch = req.body.uniqueSearch;
    const streamId = req.body.streamId;
    const itemSearch = req.body.itemSearch;
    const itemReplace = req.body.itemReplace;

    async function itemContent () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const streamItems = await fetch.streamsBlogItems(authToken, streamId, uniqueSearch);
            const updateTest = await update.embedContent(authToken, streamItems, itemSearch, itemReplace);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json(`Stream ${streamId} content updated with new content!`);
        }
    }
    itemContent();
});

module.exports = router;