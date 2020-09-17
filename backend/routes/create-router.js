const router = require('express').Router();

// Utility functions
const auth    = require('./utilities/auth');
const parse   = require('./utilities/csv-parser');
const compare = require('./utilities/compare');
const fetch   = require('./utilities/fetch');

// Functions
const create = require('./create-functions/create');

// Request handle all create requests
router.route('/tags').post((req, res) => {
    var clientId     = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function createTags () {
        const authToken = await auth.authenticateCredsV2(clientId, clientSecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log("\n--- API Authentication Successful ---\n");

            const newTags      = await parse.CSV(fileContents);
            const existingTags = await fetch.tagId(authToken);
            const compareTags  = await compare.tags(existingTags, newTags);
            const createTags   = await create.tags(authToken, compareTags);
            const tagItems     = await create.tagItems(authToken, newTags, existingTags);
            
            console.timeEnd('--- API Call Timer ---');
            return res.status(201).json('Tag list created');
        }
    }
    createTags();
});

router.route('/streams').post((req, res) => {
    var clientId     = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function createMarketingStream () {
        const authToken = await auth.authenticateCredsV2(clientId, clientSecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log("\n--- API Authentication Successful ---\n");
        
            const newMarketingStreams = await parse.CSV(fileContents);
            console.log(newMarketingStreams);

            console.timeEnd('--- API Call Timer ---');
            return res.status(201).json('Marketing streams created');
        }
    }
    createMarketingStream();
});

module.exports = router;