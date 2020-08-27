const router = require('express').Router();
const axios = require('axios');

// Utility functions
const auth = require('./utilities/auth');
const parser = require('./utilities/csv-parser');

// Functions
const create = require('./upload-functions/create');
const compare = require('./upload-functions/compare');
const fetch = require('./upload-functions/fetch');

// Request handle all upload requests
router.route('/').post((req, res) => 
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var selectValue = req.body.selectValue;
    var fileContents = req.body.fileContents;

    var creds = {
        clientId,
        clientSecret,
        selectValue,
        fileContents
    }

    async function operator () {

        const authToken = await auth.authenticateCreds(clientId, clientSecret);

        if (authToken) {
            console.log("--- API Authentication Successful ---\n");

            switch(selectValue) {
                case 'Tags':
                    const newTags = await parser.parseCSV(fileContents);
                    const existingTags = await fetch.tagId(authToken);
                    const compareTags = await compare.tags(existingTags, newTags);
                    const createTags = await create.tags(authToken, compareTags);

                    //Build item tager
                    //const tagItems = await create.tagOnItem(authToken, fileContents);

                    break;
                case 'User Profiles':
                    console.log(selectValue);
                    break;
                case 'Metadescription/SEOs':
                    console.log(selectValue);
                    break;
                case 'Marketing Streams':
                    console.log(selectValue);
                    break;
                case 'Canonical URLs':
                    console.log(selectValue);
                    break;
                default:
                    console.log("Make selection");
                    break;
            }
        }
    }

    operator();

    res.json(creds);
});

module.exports = router;