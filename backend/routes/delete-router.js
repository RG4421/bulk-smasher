const router = require('express').Router();
const axios = require('axios');

// Utility functions
const auth = require('./utilities/auth');
const parse = require('./utilities/csv-parser');
const compare = require('./utilities/compare');

// Functions
const fetch = require('./upload-functions/fetch')
const deleteFunc = require('./delete-functions/delete');

router.route('/allTags').post((req, res) =>
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;

    async function deleteAllTags () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const tagIds = await fetch.tagId(authToken);
            const deleteTags = await deleteFunc.deleteAll(authToken, tagIds);

            return res.status(201).json('All Tags Deleted');
        }
    }
    deleteAllTags();
});

router.route('/tagList').post((req, res) => 
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function deleteTagList () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const tagIds = await fetch.tagId(authToken);
            const deleteList = await deleteFunc.deleteList(authToken, fileContents, tagIds);

            return res.status(201).json('Requested Tag List Deleted');
        }
    }
    deleteTagList();
});

router.route('/streamItems').post((req, res) => {
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function deleteStreamItems () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const csvData = await parse.CSV(fileContents);
            const deleteItems = await deleteFunc.deleteStreamItems(authToken, csvData);

            return res.status(201).json('Requested Stream Items Deleted');
        }
    }
    deleteStreamItems();
});

router.route('hiddenItems').post((req, res) => {

    // ADD IN NEW LOGIC
});

module.exports = router;