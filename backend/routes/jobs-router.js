const router = require('express').Router();

const auth = require('./utility-functions/auth');
const fetch = require('./utility-functions/fetch');

router.route('/view').post(async (req, res) => {
    const APIKey = req.body.APIKey;
    const APISecret = req.body.APISecret;

    let authToken = await auth.authenticateCredsV2(APIKey, APISecret);
    let fetchHub = await fetch.getHub(authToken);

    return res.status(201).json({
        message: `Job endpoint successfully called - ${fetchHub}`
    });
});

module.exports = router;