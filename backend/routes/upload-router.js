const router = require('express').Router();
const axios = require('axios');

// Utility functions
const auth = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const compare = require('./utilities/compare');

// Functions
const create = require('./upload-functions/create');
const fetch = require('./upload-functions/fetch');

// Request handle all upload requests
router.route('/tags').post((req, res) => {
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function uploadTags () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");

            const newTags      = await parse.CSV(fileContents);
            const existingTags = await fetch.tagId(authToken);
            const compareTags  = await compare.tags(existingTags, newTags);
            const createTags   = await create.tags(authToken, compareTags);
            const tagIds       = await fetch.tagId(authToken);
            const tagItems     = await create.tagItems(authToken, newTags, tagIds);
            
            return res.status(201).json('Deleted Tag List');
        }
    }
    uploadTags();
});

router.route('/marketingStream').post((req, res) => {
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function uploadMarketingStream () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
        
            const newMarketingStreams = await parse.CSV(fileContents);
            console.log(newMarketingStreams);

        }
    }
    uploadMarketingStream();
});

module.exports = router;