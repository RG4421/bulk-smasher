const axios = require('axios');
const dateFormat = require('dateformat');

// Delete all tags in instance
async function deleteAll (token, tagIds) {
    let logObj = [];
    let runCount = 0;

    for (const tag of tagIds) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            await axios({
                url: `https://v2.api.uberflip.com/tags/${tag.id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            let resultString = `${dateTime}  -  DELETED TAG  -  '${tag.name}'\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting '${tag.name}'\n`;
            runCount++;
            logObj.push(errorMessage); 
            console.log(errorMessage);
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

// Delete list of tags
async function deleteList (token, csv, tagIds) {
    let logObj = [];
    let runCount = 0;
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
                    await axios({
                        url: `https://v2.api.uberflip.com/tags/${tagId}`,
                        method: 'delete',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    let resultString = `${dateTime}  -  DELETED TAG  -  '${tagName}'\n`;
                    runCount++;
                    logObj.push(resultString);
                    console.log(resultString);
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting '${tagName}'\n`;
                    runCount++;
                    logObj.push(errorMessage); 
                    console.log(errorMessage);
                }
            }
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

// Delete items from Hub
async function items (token, data) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let itemId = temp.item_id;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            await axios({
                url: `https://v2.api.uberflip.com/items/${itemId}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            let resultString = `${dateTime}  -  DELETED ITEMS  -  Deleted item '${itemId}\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);
        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting '${itemId}'\n`;
            runCount++;
            logObj.push(errorMessage);
            console.log(errorMessage);
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

// Delete items in stream
async function deleteItems (token, data) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let props = Object.keys(temp);
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        for (let j = 1; j < props.length; j++) {
            let itemName = props[j];
            let itemId = temp[itemName];

            try {
                await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}`,
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                let resultString = `${dateTime}  -  DELETED ITEMS  -  Deleted item '${itemId}\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting '${itemId}'\n`;
                runCount++;
                logObj.push(errorMessage);
                console.log(errorMessage);
            }
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

// Delete streams in CSV
async function streams (token, data) {
    let logObj = [];
    let runCount = 0;

    for (let stream of data) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            await axios({
                url: `https://v2.api.uberflip.com/streams/${stream.stream_id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            let resultString = `${dateTime}  -  DELETED STREAMS  -  Deleted stream '${stream.stream_id}'\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);
        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting stream '${stream.stream_id}'\n`;
            runCount++;
            logObj.push(errorMessage);
            console.log(errorMessage);
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

async function deleteStreamItems (token, csvData) {
    let logObj = [];
    let runCount = 0;

    for (var i = 0; i < csvData.length; i++) {
        var streamId = csvData[i].stream_id;
        var temp = csvData[i];
        var props = Object.keys(temp);

        for (var j = 1; j < props.length; j++) {
            var itemName = props[j];
            var itemId = temp[itemName];
            let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

            try {
                await axios({
                    url: `https://v2.api.uberflip.com/streams/${streamId}/items/${itemId}`,
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                let resultString = `${dateTime}  -  DELETED STREAMS  -  Deleted item '${itemId}' from '${streamId}'\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                const errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Deleting item '${itemId}' from '${streamId}'\n`;
                runCount++;
                logObj.push(errorMessage);
                console.log(errorMessage);
                console.log(err);
            }
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

module.exports = { 
    deleteAll, 
    deleteList, 
    deleteItems,
    deleteStreamItems,
    streams,
    items
}