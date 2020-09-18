const router = require('express').Router();

// Utility functions
const auth  = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const fetch = require('./utilities/fetch');

// Functions
const update = require('./update-functions/update');

router.route('/hidePastContent').post((req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const selectDate = req.body.selectDate;
    const fileContents = req.body.fileContents;
    const selectValue = req.body.selectValue;

    async function hidePastContent () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');
            
            const csvData = await parse.CSV(fileContents);
            const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
            await update.pastContent(authToken, pastContent, selectValue);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(200).json('Past content status set to hidden');
        }
    }
    hidePastContent();
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
            return res.status(200).json('Past content status set to display');
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
            return res.status(200).json('Author of items updated');
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
            return res.status(200).json('Author of items updated');
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
            return res.status(200).json('Author of items updated');
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
            return res.status(200).json('Streams populated with new items');
        }
    }
    populateStreams();
});

module.exports = router;