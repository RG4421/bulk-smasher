const router = require('express').Router();
const dateFormat = require('dateFormat');
const dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

// Utility functions
const auth = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const compare = require('./utilities/compare');
const fetch = require('./utilities/fetch');
const fileHandler = require('./utilities/file-handler');

// Functions
const create = require('./create-functions/create');
const update = require('./update-functions/update');

/*
-----------
   TAGS
-----------
*/
router.route('/tags').post(async (req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

    try {
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        
        console.time('--- API Call Timer ---');

        const newTags = await parse.CSV(fileContents);
        const existingTags = await fetch.tagId(authToken);
        const compareTags = await compare.tags(existingTags, newTags);
        const createdTags = await create.tags(authToken, compareTags);
        const allTags = await fetch.tagId(authToken);
        const updatedTags = await update.tagItems(authToken, newTags, allTags);
        
        console.timeEnd('--- API Call Timer ---');

        let log = createdTags.concat(updatedTags);
        await fileHandler.createLog(`BULK BUSTER LOG - CREATE TAGS \n\n` + log.join(""));

        return res.status(201).json('Tags successfully created and applied!');
        
    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime}\n${e.message}\n`;
        await fileHandler.createLog(errorMessage.toString());
        return res.status(400).json({
            message: e.message
        });
    }
});

/*
-----------
  STREAMS
-----------
*/
router.route('/streams').post(async (req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

    const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

    if (authToken) {
        console.time('--- API Call Timer ---');
        console.log("\n--- API Authentication Successful ---\n");
    
        const csvData = await parse.CSV(fileContents);
        await create.streams(authToken, csvData);

        console.log('\n');
        console.timeEnd('--- API Call Timer ---');
        return res.status(201).json('Marketing streams created!');
    } else {
        return res.status(401).json('Authentication unsuccessful');
    }

});

/*
-----------
   USERS
-----------
*/
router.route('/users').post(async (req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

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
        return res.status(201).json('User profiles created and groups assigned!');
    } else {
        return res.status(401).json('Authentication unsuccessful');
    }
});

/*
-----------
   ITEMS
-----------
*/
router.route('/items').post(async (req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

    const authToken = await auth.authenticateCredsV2(APIKey, APISecret);

    if (authToken) {
        console.time('--- API Call Timer ---');
        console.log("\n--- API Authentication Successful ---\n");
    
        const csvData = await parse.CSV(fileContents);
        await create.items(authToken, csvData);
        
        console.log('\n');
        console.timeEnd('--- API Call Timer ---');
        return res.status(201).json('Items created!');
    } else {
        return res.status(401).json('Authentication unsuccessful');
    }
});

// ----------------------------
//           TESTING
// ----------------------------

router.route('/test').post(async (req, res, next) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;

    try {
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        await fileHandler.createLog(authToken);
        return res.status(200).json('Authentication Successful!');

    } catch (e) {
        const errorMessage = `Server Error - ${dateTime} \n${e.message}\n`;

        console.log(e);
        await fileHandler.createLog(errorMessage.toString());
        return res.status(400).json({
            message: e.message
        });
    }
});

module.exports = router;