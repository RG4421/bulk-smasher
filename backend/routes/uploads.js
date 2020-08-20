const router = require('express').Router();
const auth = require('./auth.js');

// Setup request to pull all existing requests for reporting
router.route('/').post((req, res) => 
{
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;
    var selectValue = req.body.selectValue;
    var file = req.body.file;

    var creds = {
        clientId,
        clientSecret,
        selectValue,
        file
    }

    // return the token value
    auth.authenticateCreds(clientId, clientSecret);

    res.json(creds);
});

module.exports = router;