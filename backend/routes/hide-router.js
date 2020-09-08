const router = require('express').Router();

// Utility functions
const auth  = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const fetch = require('./utilities/fetch');

// Functions
const hide = require('./hide-functions/hide');

router.route('/pastContent').post((req, res) => {
    var clientId     = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var selectDate   = req.body.selectDate;
    var fileContents = req.body.fileContents;

    async function hidePastContent () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log('\n--- API Authentication Successful ---\n');
            
            const csvData     = await parse.CSV(fileContents);
            const pastContent = await fetch.pastContentItems(authToken, csvData, selectDate);
            const hideItems   = await hide.pastContent(authToken, pastContent);

            console.timeEnd('--- API Call Timer ---');
        }
    }
    hidePastContent();
});

module.exports = router;