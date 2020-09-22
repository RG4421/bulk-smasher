const router = require('express').Router();

// Utility functions
const auth = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const compare = require('./utilities/compare');
const fetch = require('./utilities/fetch');

// Functions
const create = require('./create-functions/create');
const update = require('./update-functions/update');

router.route('/tags').post((req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

    async function createTags () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log("\n--- API Authentication Successful ---\n");

            const newTags = await parse.CSV(fileContents);
            const existingTags = await fetch.tagId(authToken);
            const compareTags = await compare.tags(existingTags, newTags);
            await create.tags(authToken, compareTags);
            await update.tagItems(authToken, newTags, existingTags);
            
            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(201).json('Tag list created');
        }
    }
    createTags();
});

router.route('/streams').post((req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

    async function createMarketingStream () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log("\n--- API Authentication Successful ---\n");
        
            const csvData = await parse.CSV(fileContents);
            await create.streams(authToken, csvData);

            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(201).json('Marketing streams created');
        }
    }
    createMarketingStream();
});

router.route('/users').post((req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

    async function createUserProfile () {
        const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        if (authToken) {
            console.time('--- API Call Timer ---');
            console.log("\n--- API Authentication Successful ---\n");
        
            const csvData = await parse.CSV(fileContents);
            const newUsers = await create.users(authToken, csvData);
            const existingUsers = await fetch.users(authToken);
            const userGroups = await fetch.groups(authToken);
            const compareUsers = await compare.users(existingUsers, newUsers, userGroups);
            await update.groups(authToken, compareUsers);
            
            console.log('\n');
            console.timeEnd('--- API Call Timer ---');
            return res.status(201).json('User profiles created');
        }
    }
    createUserProfile();
});

module.exports = router;