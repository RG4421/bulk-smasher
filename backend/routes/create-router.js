const router = require('express').Router();
const timer = require('execution-time')();
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
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        
        const newTags = await parse.CSV(fileContents);
        const existingTags = await fetch.tagId(authToken);
        const compareTags = await compare.tags(existingTags, newTags);
        const createdTags = await create.tags(authToken, compareTags);
        const allTags = await fetch.tagId(authToken);
        const updatedTags = await update.tagItems(authToken, newTags, allTags);

        let log = createdTags.concat(updatedTags);
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - TAGS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(201).json(`Tags successfully created and applied - Runtime: ${time.words}`);
        
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
-----------
  STREAMS
-----------
*/
router.route('/streams').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const createdStreams = await create.streams(authToken, csvData);

        let log = createdStreams;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - STREAMS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(201).json(`Streams successfully created and populated - Runtime: ${time.words}`);

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
-----------
   USERS
-----------
*/
router.route('/users').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;
    const fileContents = req.body.fileContents;

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const newUsers = await create.users(authToken, csvData);
        const existingUsers = await fetch.users(authToken);
        const userGroups = await fetch.groups(authToken);
        const compareUsers = await compare.users(existingUsers, newUsers.user, userGroups);
        const updatedUsers = await update.groups(authToken, compareUsers);

        let log = newUsers.logObj.concat(updatedUsers);
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - USERS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(201).json(`User profiles created and groups assigned - Runtime: ${time.words}`);
        
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
-----------
   ITEMS
-----------
*/
router.route('/items').post(async (req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;
    var fileContents = req.body.fileContents;

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);

        const csvData = await parse.CSV(fileContents);
        const createdItems = await create.items(authToken, csvData);

        let log = createdItems;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - ITEMS (Runtime ${time.words}) ---\n\n` + log.join(""));

        return res.status(201).json(`User profiles created and groups assigned - Runtime: ${time.words}`);

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${dateTime} - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
        return res.status(400).json({
            message: errorMessage
        });
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