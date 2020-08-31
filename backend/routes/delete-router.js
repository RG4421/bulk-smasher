const router = require('express').Router();
const axios = require('axios');

// Utility functions
const auth = require('./utilities/auth');

// Functions
const fetch = require('./upload-functions/fetch')
const deleteTags = require('./delete-functions/delete');

router.route('/allTags').post((req, res) =>
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;

    async function deleteAllTags () {
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("\n--- API Authentication Successful ---\n");
            const tagIds = await fetch.tagId(authToken);
            const deleteAllTags = await deleteTags.deleteAll(authToken, tagIds);

            return res.status(201).json('Deleted All Tags');
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
            const deleteList = await deleteTags.deleteList(authToken, fileContents, tagIds);

            return res.status(201).json('Deleted Tag List');
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
            //const streamItemIds = await fetch.streamItemIds(authToken, )

            return res.status(201).json('Deleted Stream Items');
        }
    }
    deleteStreamItems();
});

module.exports = router;