const axios = require('axios');

async function pastContent (token, csv) {
    console.log(csv);

    // WHAT FORMAT I NEED TO PATCH EXISTING ITEMS
    // MARKETING STREAMS ITEM DELETE ISSUE

    try {
        const result = await axios({
            url: `https://v2.api.uberflip.com/items`,
            method: 'patch',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                hidden: false,
            },
        });
        console.log(`Items hidden`);

    } catch (err) {
        console.log(err);
    }
}

module.exports = { 
    pastContent 
};