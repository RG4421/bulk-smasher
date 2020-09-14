const router = require('express').Router();

// Utility functions
const auth  = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const fetch = require('./utilities/fetch');

// Functions
const update = require('./update-functions/update');

router.route('/hidePastContent').post((req, res) => {
    const clientId     = req.body.clientId;
    const clientSecret = req.body.clientSecret;
    const selectDate   = req.body.selectDate;
    const fileContents = req.body.fileContents;
    const selectValue  = req.body.selectValue;

    async function hidePastContent () {
        const authToken = await auth.authenticateCredsV2(clientId, clientSecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');
            
            const csvData     = await parse.CSV(fileContents);
            const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
            const hideItems   = await update.pastContent(authToken, pastContent, selectValue);

            console.timeEnd('--- API Call Timer ---');
        }
    }
    hidePastContent();
});

router.route('/showPastContent').post((req, res) => {
    const clientId     = req.body.clientId;
    const clientSecret = req.body.clientSecret;
    const selectDate   = req.body.selectDate;
    const fileContents = req.body.fileContents;
    const selectValue  = req.body.selectValue;

    async function showPastContent () {
        const authToken = await auth.authenticateCredsV2(clientId, clientSecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');
            
            const csvData     = await parse.CSV(fileContents);
            const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
            const showItems   = await update.pastContent(authToken, pastContent, selectValue);

            console.timeEnd('--- API Call Timer ---');
        }
    }
    showPastContent();
});

router.route('/author').post((req, res) => {
    const clientId     = req.body.clientId;
    const clientSecret = req.body.clientSecret;
    const fileContents = req.body.fileContents;
    
    async function showPastContent () {
        const authToken = await auth.authenticateCredsV2(clientId, clientSecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');

            const csvData = await parse.CSV(fileContents);
            const author = await update.author(authToken, csvData);

            console.timeEnd('--- API Call Timer ---');
        }
    }
    showPastContent();
});

module.exports = router;