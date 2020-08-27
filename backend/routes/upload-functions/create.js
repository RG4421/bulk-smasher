const axios = require('axios');

async function tags (token, data) {

    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var itemId = obj.item_id;
        var props = Object.keys(data[i]);

        // Skipping itemId
        for (var j = 1; j < props.length; j++) {
            var tagName = props[j];
            var tag = obj[tagName];

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
                        name: tag,
                    },
                });
                console.log(`Tag name created ${tag}`);
                //console.log(result);

            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = { tags };