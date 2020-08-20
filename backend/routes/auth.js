var axios = require('axios');
var request = require('request');

async function authenticateCreds(id, secret) {
    const URL = 'https://v2.api.uberflip.com/authorize';
    const CLIENT_ID = id;
    const CLIENT_SECRET = secret;

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
    
    async function fetchToken() {
        const tokenData = await fetchUser();
        const token = tokenData.data.access_token;

        return token;
      };
    
    return fetchToken();
}

module.exports = { authenticateCreds };