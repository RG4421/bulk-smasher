const router = require('express').Router();
const axios = require('axios');

// Utility functions
const auth = require('./utilities/auth');

// Functions
const fetch = require('./upload-functions/fetch')
const deleteTags = require('./delete-functions/delete');

router.route('/all').post((req, res) => 
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;

    async function deleteAllTags () {
        
        const token = await auth.authenticateCreds(clientId, clientSecret);

        //Test API call to post a new tag
        if (token) {
            console.log("--- API Authentication Successful ---");
            const tagIds = await fetch.tagId(token);
            const deleteAllTags = await deleteTags.deleteAll(token, tagIds);
        }
    }
    deleteAllTags();
});

module.exports = router;