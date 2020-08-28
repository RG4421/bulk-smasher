const router = require('express').Router();
const axios = require('axios');

// Utility functions
const auth = require('./utilities/auth');

// Functions
const fetch = require('./upload-functions/fetch')
const deleteTags = require('./delete-functions/delete');

router.route('/').post((req, res) => {

    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var fileContents = req.body.fileContents;

    async function deleteSpecificTags () {

        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("--- API Authentication Successful ---\n");
            console.log(clientId);
            console.log(clientSecret);
            console.log(fileContents)
        }
    }
    deleteSpecificTags();
});

router.route('/all').post((req, res) =>
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;

    async function deleteAllTags () {
        
        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        //Test API call to post a new tag
        if (authToken) {
            console.log("--- API Authentication Successful ---\n");
            const tagIds = await fetch.tagId(authToken);
            const deleteAllTags = await deleteTags.deleteAll(authToken, tagIds);
        }
    }
    deleteAllTags();
});

module.exports = router;