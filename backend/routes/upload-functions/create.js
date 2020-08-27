const axios = require('axios');

async function tags (token, data) {

    // Pulling in unique tags to be created
    for (let tagName of data) {
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
                    name: tagName,
                },
            });
            console.log(`Tag name created ${tagName}`);

        } catch (err) {
            console.log(err);
        }
    }
}

async function tagOnItem (token, data) {
    console.log("tag on item");
}

module.exports = { tags, tagOnItem };