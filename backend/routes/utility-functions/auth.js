const axios = require('axios');
const jwt = require('jsonwebtoken');
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function authenticateCredsV1(key, signature, hubId) {
    const URL = 'https://api.uberflip.com/';
    const KEY = key;
    const SIGNATURE = signature;
    const HUB_ID = hubId;

    // Fetching HubUser metadata
    async function fetchUser() {
        let result;
        try {
            result = await axios({
                url: URL,
                method: 'get',
                params: {
                    Version: '0.1',
                    Method: 'AuthenticateHubUser',
                    APIKey: KEY,
                    Signature: SIGNATURE,
                    HubId: HUB_ID,
                    ResponseType: 'JSON'
                },
            });
        } catch (err) {
            return err;
        }
        return result;
    }
    
    // Extracting token for API calls
    async function fetchToken() {
        const tokenData = await fetchUser();
        const token = tokenData.data[0].Token;

        return token;
    };
    return fetchToken();
}

async function authenticateCredsV2(key, secret) {
    const URL = 'https://v2.api.uberflip.com/authorize';
    const KEY = key;
    const SECRET = secret;

    // Fetching user metadata
    async function fetchUser() {
        let result;
        try {
            result = await axios({
                url: URL,
                method: 'post',
                data: {
                    grant_type: 'client_credentials',
                    client_id: KEY,
                    client_secret: SECRET,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });            
        } catch (err) {
            throw Error('Uberflip Authentication failed - check your API credentials', err);
        }
        return result;
    }
    
    // Extracting token for API calls
    async function fetchToken() {
        try {
            const tokenData = await fetchUser();
            const token = tokenData.data.access_token;
            return token;
        } catch (err) {
            throw Error('Uberflip Authentication failed - check your API credentials', err);
        }
    };
    return fetchToken();
}

async function googleAuth (creds, date, logId, type, operator, executions, time) {

    let convertedRuntime;
    let emet = parseFloat((executions * 0.8) / 60).toFixed(2);
    let value = time.time;
    let unit = time.words.split(' ')[1];

    // convert runtime into minutes for reporting
    if (unit === 's') {
        convertedRuntime = parseFloat(value / 1000 / 60).toFixed(2);
    } else if (unit === 'min') {
        convertedRuntime = parseFloat(value / 1000 / 60).toFixed(2);
    } else if (unit === 'h') {
        convertedRuntime = parseFloat(value / 1000 / 60 / 60).toFixed(2);
    }

    let delta = emet - convertedRuntime;

    const sheetId = '1z2dwUjJKsmpm_mg66d0iTEICs_CES_4UD5_nmH9Sf-E';
    const doc = new GoogleSpreadsheet(sheetId);

    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key
    });
    await doc.getInfo();
    const sheet = doc.sheetsByIndex[0];

    const row = {
        Date: date,
        Log: `https://bulksmasher.uberflip.com/server-logs/BulkSmasherLog-${logId}.txt`,
        Type: type,
        Operator: operator,
        Executions: executions,
        EMET: emet,
        Runtime: convertedRuntime,
        Delta: delta
    }
    await sheet.addRow(row);
}

async function authenticateJWT (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.status(401).json({
            message: `Authentication Unsuccessful - Check your passphrase`,
        });
    } 

    jwt.verify(token, process.env.BULKSMASHER_TOKEN, (err, password) => {
        if (err) {
            return res.status(403).json({
                message: `Token is no longer valid`,
            });
        }
        req.password = password;
        next();
    });
}

module.exports = { 
    authenticateCredsV1,
    authenticateCredsV2,
    googleAuth,
    authenticateJWT
};