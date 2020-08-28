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
            console.log(`Tag ${tagName} created`);

        } catch (err) {
            console.log(err);
        }
    }
}

async function tagItems (token, data, tagIds) {

    // Looping through CSV data
    for (var i = 0; i < data.length; i++) {
        const obj = data[i];
        const itemId = obj.item_id;
        var props = Object.keys(obj);

        // Looping through props of CSV data
        for (var j = 1; j < props.length; j++) {
            var tagName = props[j];
            var tag = obj[tagName];

            // Comparing CSV props to existing tags to be added
            for (var k = 0; k < tagIds.length; k++) {
                const tagId = tagIds[k].id;
                const tagName = tagIds[k].name;

                // Added tag to item if CSV tag matches existing tag name
                if (tag === tagName) {
                    try {                        
                        const result = await axios({
                            url: `https://v2.api.uberflip.com/items/${itemId}/tags/${tagId}`,
                            method: 'put',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        console.log(`Tag ${tagName} added added to ${itemId}`);
            
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    }
}

module.exports = { tags, tagItems };