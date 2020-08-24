const router = require('express').Router();
const axios = require('axios');
const auth = require('./utilities/auth');
const tags = require('./upload-functions/fetch-tags')
const deleteTags = require('./delete-functions/delete-tags');

router.route('/all').post((req, res) => 
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;

    async function deleteAllTags () {
        
        const token = await auth.authenticateCreds(clientId, clientSecret);

        //Test API call to post a new tag
        if (token) {
            console.log("API Authentication Successful with token " + token);
            const tagIds = await tags.fetchTagId(token);
            const deleteAllTags = await deleteTags.deleteAll(token, tagIds);
        }
    }
    deleteAllTags();
});

router.route('/test').get((req, res) => 
{
    res.json("The get request worked");
});

module.exports = router;