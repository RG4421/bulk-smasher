const axios = require('axios');
const dateFormat = require('dateFormat');

// Delete all tags in instance
async function deleteAll (token, tagIds) {
    let logObj = [];

    for (const tag of tagIds) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/tags/${tag.id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            let resultString = `${dateTime}  -  DELETED TAG  -  '${tag.name}'\n`;
            logObj.push(resultString);
            console.log(resultString);

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting '${tag.name}'\n`;
            logObj.push(errorMessage); 
        }
    }
    return logObj
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

// Delete streams in CSV
async function streams (token, data) {
    for (const stream of data) {

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/streams/${stream.stream_id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(`Deleted stream ${stream.stream_id}`);

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { 
    deleteAll, 
    deleteList, 
    deleteStreamItems,
    streams
}