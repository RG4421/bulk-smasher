const axios = require('axios');
const tags = require('./fetch-tags');

async function createTags (token) {
    try {
        const tagGroupId = async => tags.fetchTagGroup(token);
        
        const result = await axios({
            url: 'https://v2.api.uberflip.com/tags',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: {
                tag_group_id: tagGroupId,
                name: "QWEERR Tag",
            },
        });

        console.log(result);

    } catch (err) {
        console.log(err);
    }
}

module.exports = { createTags };