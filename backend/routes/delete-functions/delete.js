const axios = require('axios');

// Delete all tags in instance
async function deleteAll (token, tagIds) {
    for (const tag of tagIds) {
        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/tags/${tag.id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(`Deleted tag ${tag.name}`);

        } catch (err) {
            console.log(err);
        }
    }
}

// Delete list of tags
async function deleteList (token, csv, tagIds) {

    var rows = csv.split("\n");

    // Ignoring header
    for (var i = 1; i < rows.length; i++) {
        var newRow = rows[i].split("\r");
        var tags = newRow[0];

        for (var j = 0; j < tagIds.length; j++) {
            const tagName = tagIds[j].name;
            const tagId = tagIds[j].id;
            
            if (tags === tagName) {
                try {
                    const result = await axios({
                        url: `https://v2.api.uberflip.com/tags/${tagId}`,
                        method: 'delete',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    console.log(`Deleted tag ${tagId}`);

                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
}

// Delete items in stream
async function deleteStreamItems (token, csv) {

    for (var i = 0; i < csv.length; i++) {
        var streamId = csv[i].stream_id;
        var temp = csv[i];
        var props = Object.keys(temp);

        for (var j = 1; j < props.length; j++) {
            var itemName = props[j];
            var itemId = temp[itemName];

            try {
                const result = await axios({
                    url: `https://v2.api.uberflip.com/streams/${streamId}/items/${itemId}`,
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(`Deleted item ${itemId} from ${streamId}`);

            } catch (err) {
                console.log(err);
            }
        }
    }
}

// Delete past content from source stream: DELETE https://v2.api.uberflip.com/items/{itemId}

module.exports = { 
    deleteAll, 
    deleteList, 
    deleteStreamItems 
}