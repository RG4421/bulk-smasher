const router = require('express').Router();
const axios = require('axios');

const auth = require('./utilities/auth');
const parser = require('./utilities/csv-parser')
const createTags = require('./upload-functions/create-tags')
const fetchTags = require('./upload-functions/fetch-tags')
const fetchItemTags = require('./upload-functions/fetch-item-tags')

// Setup request to pull all existing requests for reporting
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

        const token = await auth.authenticateCreds(clientId, clientSecret);

        if (token) {
            console.log("API Authentication Successful with token " + token);

            switch(selectValue) {
                case 'Tags':
                    console.log(fileContents);
                    const parsedData = await parser.parseCSV(fileContents);

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
                default:
                    console.log("Make selection");
                    break;
            }
        }
    }

    operator();

    res.json(creds);
});

router.route('/test').get((req, res) => 
{
    res.json("The get request worked");
});

module.exports = router;