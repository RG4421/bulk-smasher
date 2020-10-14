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
            console.log(errorMessage);
        }
    }
    return logObj;
}

// Delete list of tags
async function deleteList (token, csv, tagIds) {
    let logObj = [];
    let rows = csv.split("\n");

    // Ignoring header
    for (var i = 1; i < rows.length; i++) {
        let newRow = rows[i].split("\r");
        let tags = newRow[0];
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        for (let j = 0; j < tagIds.length; j++) {
            let tagName = tagIds[j].name;
            let tagId = tagIds[j].id;
            
            if (tags === tagName) {
                try {
                    const result = await axios({
                        url: `https://v2.api.uberflip.com/tags/${tagId}`,
                        method: 'delete',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    let resultString = `${dateTime}  -  DELETED TAG  -  '${tagName}'\n`;
                    logObj.push(resultString);
                    console.log(resultString);
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting '${tagName}'\n`;
                    logObj.push(errorMessage); 
                    console.log(errorMessage);
                }
            }
        }
    }
    return logObj;
}

// Delete items in stream
async function deleteItems (token, data) {
    let logObj = [];

    for (let i = 0; i < data.length; i++) {
        let streamId = data[i].stream_id;
        let temp = data[i];
        let props = Object.keys(temp);
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        for (let j = 1; j < props.length; j++) {
            let itemName = props[j];
            let itemId = temp[itemName];

            try {
                const result = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}`,
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                let resultString = `${dateTime}  -  DELETED ITEMS  -  Deleted item '${itemId}\n`;
                logObj.push(resultString);
                console.log(resultString);
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting '${itemId}'\n`;
                logObj.push(errorMessage);
                console.log(errorMessage);
            }
        }
    }
    return logObj;
}

// Delete streams in CSV
async function streams (token, data) {
    let logObj = [];

    for (let stream of data) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/streams/${stream.stream_id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            let resultString = `${dateTime}  -  DELETED STREAMS  -  Deleted stream '${stream.stream_id}'\n`;
            logObj.push(resultString);
            console.log(resultString);
        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting stream '${stream.stream_id}'\n`;
            logObj.push(errorMessage);
            console.log(errorMessage);
        }
    }
    return logObj;
}

module.exports = { 
    deleteAll, 
    deleteList, 
    deleteItems,
    streams
}