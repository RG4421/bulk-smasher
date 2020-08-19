const router = require('express').Router();

// Setup request to pull all existing requests for reporting
router.route('/').post((req, res) => 
{
    var creds = req.body.clientId_post

    res.json(creds);
});

module.exports = router;