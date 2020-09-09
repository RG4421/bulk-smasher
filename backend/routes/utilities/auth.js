var axios = require('axios');

async function authenticateCredsV1(key, signature, userId) {
    const URL = 'https://api.uberflip.com/';
    const KEY = key;
    const SIGNATURE = signature;
    const USER_ID = userId;

    // Fetching user metadata
    async function fetchUser() {
        let result;
        try {
            result = await axios({
                url: URL,
                method: 'get',
                params: {
                    Version: '0.1',
                    Method: 'AuthenticateRemoteUser',
                    APIKey: KEY,
                    Signature: SIGNATURE,
                    UserId: USER_ID
                },
                // headers: {
                //     'Content-Type': 'application/json'
                // }
            });
        } catch (err) {
            console.log(err);
        }
        //return result;
        console.log(result);
    }
    
    // Extracting token for API calls
    // async function fetchToken() {
    //     const tokenData = await fetchUser();
    //     const token = tokenData.Token;

    //     return token;
    // };
    // return fetchToken();
}

async function authenticateCredsV2(id, secret) {
    const URL = 'https://v2.api.uberflip.com/authorize';
    const CLIENT_ID = id;
    const CLIENT_SECRET = secret;

    // Fetching user metadata
    async function fetchUser() {
        let result;
        try {
            result = await axios({
                url: URL,
                method: 'post',
                data: {
                    grant_type: 'client_credentials',
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.log(err);
        }
        return result;
    }
    
    // Extracting token for API calls
    async function fetchToken() {
        const tokenData = await fetchUser();
        const token = tokenData.data.access_token;

        return token;
    };
    return fetchToken();
}

module.exports = { 
    authenticateCredsV1,
    authenticateCredsV2 
};