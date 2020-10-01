var axios = require('axios');

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
            return err;
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
            return err;
        }
    };
    return fetchToken();
}

module.exports = { 
    authenticateCredsV1,
    authenticateCredsV2 
};