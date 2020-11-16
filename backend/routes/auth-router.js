const router = require('express').Router();
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const auth = require('./utility-functions/auth');
require('dotenv').config();


router.route('/checkCreds').get(auth.authenticateJWT, (req, res) => {
    if (req.password === process.env.BULKSMASHER_PASSWORD) {
        return res.json({
            authSuccessful: true
        });
    } else {
        return res.status(401).json({
            authSuccessful: false
        });
    }
});

router.route('/getToken').post((req, res) => {
    const password = req.body.password;

    if (req.body.password === process.env.BULKSMASHER_PASSWORD) {
        const accessToken = jwt.sign(password, process.env.BULKSMASHER_TOKEN);

        return res.status(200).json({
            _id: uuid(),
            message: `Authentication Successful`, 
            accessToken: accessToken,
        });
    } else {
        return res.status(401).json({
            message: 'Incorrect passphrase'
        });
    }
});

module.exports = router;