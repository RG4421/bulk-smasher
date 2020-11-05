const router = require('express').Router();
const timer = require('execution-time')();

// Utility functions
const auth = require('./utility-functions/auth');
const parse = require('./utility-functions/csv-parser');
const compare = require('./utility-functions/compare');
const fetch = require('./utility-functions/fetch');
const fileHandler = require('./utility-functions/file-handler');

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
        let fetchHub = await fetch.getHub(authToken);
        
        const newTags = await parse.CSV(fileContents);
        const existingTags = await fetch.tagId(authToken);
        const compareTags = await compare.tags(existingTags, newTags);
        const createdTags = await create.tags(authToken, compareTags);
        const allTags = await fetch.tagId(authToken);
        const updatedTags = await update.tagItems(authToken, newTags, allTags);

        let log = createdTags.concat(updatedTags);
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - TAGS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));
        
        return res.status(201).json({
            message: `Tags successfully created and applied - Runtime: ${time.words}`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });
        
    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${e.message}\n`;
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
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const createdStreams = await create.streams(authToken, csvData);

        let log = createdStreams;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - STREAMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        return res.status(201).json({
            message: `Streams successfully created and populated - Runtime: ${time.words}`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${e.message}\n`;
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
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const newUsers = await create.users(authToken, csvData);
        const existingUsers = await fetch.users(authToken);
        const userGroups = await fetch.groups(authToken);
        const compareUsers = await compare.users(existingUsers, newUsers.user, userGroups);
        const updatedUsers = await update.groups(authToken, compareUsers);

        let log = newUsers.logObj.concat(updatedUsers);
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - USERS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));
        
        return res.status(201).json({
            message: `User profiles created and groups assigned - Runtime: ${time.words}`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${e.message}\n`;
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
        let fetchHub = await fetch.getHub(authToken);

        const csvData = await parse.CSV(fileContents);
        const createdItems = await create.items(authToken, csvData);

        let log = createdItems;
        const time = timer.stop();
        console.log('--- Execution Time --- : ', time.words);
        const logId = await fileHandler.createLog(`--- BULK BUSTER LOG - CREATE - ITEMS (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n` + log.join(""));

        return res.status(201).json({
            message: `User profiles created and groups assigned - Runtime: ${time.words}`,
            log_name: `BulkSmasherLog-${logId}.txt`
        });

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${e.message}\n`;
        //await fileHandler.createLog(errorMessage.toString());
        return res.status(400).json({
            message: errorMessage
        });
    }
});

router.route('/test').post(async (req, res) => {
    var APIKey = req.body.APIKey;
    var APISecret = req.body.APISecret;

    try {
        timer.start();
        let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
        let fetchHub = await fetch.getHub(authToken);

        const time = timer.stop();
        let logId = await fileHandler.createLog(`--- TEST TEST TEST (Runtime ${time.words}) ---\n\n- HUBS - \n` + fetchHub.join("") + `\n- ACTIVITY LOG -\n`);

        return res.status(201).json({
                message: `TEST CALL RAN - Runtime: ${time.words}`,
                log_name: `BulkSmasherLog-${logId}.txt`
            });

    } catch (e) {
        console.log(e);
        const errorMessage = `SERVER ERROR - ${e.message}\n`;
        return res.status(400).json({
            message: errorMessage
        });
    }
});

module.exports = router;