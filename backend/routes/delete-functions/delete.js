const axios = require('axios');

async function deleteAll(token, tagIds) {
    for (const tag of tagIds) {
        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/tags/${tag.id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(`Deleted tag id ${tag.id}`);

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { deleteAll }