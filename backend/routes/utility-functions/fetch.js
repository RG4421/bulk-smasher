const axios = require('axios');
const dateFormat = require('dateformat');

// Fetches tag group id
async function tagGroup (token) {
    try {
        const result = await axios({
            url: "https://v2.api.uberflip.com/tags",
            method: "get",
            params: {
                limit: 100,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const tagGroupId = result.data.data[0].tag_group_id;
        return tagGroupId;

    } catch (err) {
        console.log(err.response.data.errors);
    }
}

// Fetches all tag ids
async function tagId (token) {
    let runCount = 1;
    let resArr = [];

    async function allTagIds () {
        try {
            const result = await axios({
                url: "https://v2.api.uberflip.com/tags",
                method: "get",
                params: {
                    limit: 100,
                    page: runCount
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const tagMetadata = result.data.data.length;

            for (let i = 0; i < tagMetadata; i++) {
                let id = result.data.data[i].id;
                let name = result.data.data[i].name;
                let obj = {};
                
                obj['id'] = id;
                obj['name'] = name;
                resArr.push(obj);
            }
            runCount++;

            return {
                totalPages: result.data.meta.total_pages,
            }

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
    
    let { totalPages } = await allTagIds();

    for (let i = 0; i < totalPages; i++) {
        await allTagIds();
    }
    return resArr;
}

// Fetches all items
async function itemTags (token) {
    try {
        const result = await axios({
            url: "https://v2.api.uberflip.com/items",
            method: "get",
            params: {
                limit: 100,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const tagId = result.data.data[0].id;
        return tagId;

    } catch (err) {
        console.log(err.response.data.errors);
    }
}

// Fetching stream item's hidden items
async function hiddenStreamItems (token, data) {
    const resultArr = [];

    for (let i = 0; i < data.length; i++) {
        const streamId = data[i].stream_id;

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/streams/${streamId}/items`,
                method: "get",
                params: {
                    limit: 100,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const streamItemData = result.data.data;
            const streamIds = {};
            streamIds["stream_id"] = streamId;

            for (let j = 0; j < streamItemData.length; j++) {
                if (streamItemData[j].hidden === true) {
                  streamIds[`item_id${j}`] = streamItemData[j].id;
                }
            }
        resultArr.push(streamIds);
        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
    return resultArr;
}

// Fetching stream item's prior to selected date
async function pastContentItems (token, date) {
    const resultArr = [];

    try {
        const result = await axios({
            url: `https://v2.api.uberflip.com/items`,
            method: "get",
            params: {
                limit: 100,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const streamItemData = result.data.data;
        const streamIds = {};

        for (let j = 0; j < streamItemData.length; j++) {
            const createdDate = streamItemData[j].created_at;

            if (createdDate < date) {
                streamIds[`item_id${j}`] = streamItemData[j].id;
            }
        }
        resultArr.push(streamIds);

    } catch (err) {
        console.log(err.response.data.errors);
    }
    return resultArr;
}

async function users (token) {
    const resArr = [];

    try {
        const result = await axios({
            url: `https://v2.api.uberflip.com/users`,
            method: "get",
            params: {
                limit: 100,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = result.data.data;

        for (let i = 0; i < data.length; i++) {
            const obj = {};
            obj['id'] = data[i].id;
            obj['email'] = data[i].email;
            resArr.push(obj);
        }
        return resArr;

    } catch (err) {
        console.log(err.response.data.errors);
    }
}

async function groups (token) {
    const resArr = [];

    try {
        const result = await axios({
            url: `https://v2.api.uberflip.com/user-groups`,
            method: "get",
            params: {
                limit: 100,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = result.data.data;
        
        for (let i = 0; i < data.length; i++) {
            const obj = {};
            obj['id'] = data[i].id;
            obj['name'] = data[i].name;
            resArr.push(obj);
        }
        return resArr;

    } catch (err) {
        console.log(err.response.data.errors);
    }
}

async function streams (token, data) {

    for (let i = 0; i < data.length; i++) {
        const streamId = data[i].stream_id;

        console.log(streamId);

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/items/${streamId}`,
                method: "get",
                params: {
                    limit: 100,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return result.data.content.published;

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
}

async function allBlogItems (token, searchKey) {
    let runCount = 1;
    let resArr = [];

    async function allItems () {
        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/items`,
                method: "get",
                params: {
                    limit: 100,
                    type: 'blogs',
                    page: runCount
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const resLength = result.data.data.length;

            for (let i = 0; i < resLength; i++) {
                let content = result.data.data[i].content.published;
                let id = result.data.data[i].id;
                let obj = {};
                
                if (content.includes(searchKey)) {
                    obj['id'] = id;
                    obj['content'] = content;
                    resArr.push(obj);
                }
            }
            runCount++;

            return {
                totalPages: result.data.meta.total_pages,
            }
        } catch (err) {
            console.log(err);
        }
    }

    let { totalPages } = await allItems();

    for (let i = 0; i < totalPages; i++) {
        await allItems();
    }
    return resArr;
}

async function streamsBlogItems (token, streamId, searchKey) {
    let resArr = [];

    try {
        const result = await axios({
            url: `https://v2.api.uberflip.com/streams/${streamId}/items`,
            method: "get",
            params: {
                limit: 100,
                type: 'blogs',
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const resLength = result.data.data.length;

        for (let i = 0; i < resLength; i++) {
            let content = result.data.data[i].content.published;
            let id = result.data.data[i].id;
            let obj = {};
            
            if (content.includes(searchKey)) {
                obj['id'] = id;
                obj['content'] = content;
                resArr.push(obj);
            }
        }
    } catch (err) {
        console.log(err);
    }
    return resArr;
}

async function getTaggedItems (token, searchKey, toggle) {
    let rowCount = 1;
    let runCount = 0;
    let logObj = [];
    let resArr = new Set();

    async function allItems () {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            const itemsResult = await axios({
                url: `https://v2.api.uberflip.com/items`,
                method: "get",
                params: {
                    limit: 100,
                    page: rowCount
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const items = itemsResult.data.data;

            for (let i = 0; i < items.length; i++) {
                let itemId = itemsResult.data.data[i].id;

                try {
                    const result = await axios({
                        url: `https://v2.api.uberflip.com/items/${itemId}/tags`,
                        method: "get",
                        params: {
                            limit: 100,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const tags = result.data.data;

                    for (let j = 0; j < tags.length; j++) {
                        let tagName = tags[j].name;

                        if (toggle === true) {
                            if (tags[j].name === searchKey) {
                                let resultString = `${dateTime}  -  FETCHED ITEMS '${itemId}'  -  '${tagName}' is a match\n`;
                                console.log(resultString);
                                runCount++;
                                resArr.add(itemId);
                                logObj.push(resultString);
                            }
                        } else if (toggle === false) {
                            if (tags[j].name !== searchKey) {
                                let resultString = `${dateTime}  -  FETCHED ITEMS '${itemId}'  -  '${tagName}' not a match\n`;
                                console.log(resultString);
                                runCount++;
                                resArr.add(itemId);
                                logObj.push(resultString);
                            }
                        }
                    }
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Listing tags for '${itemId}'\n`;
                    runCount++;
                    console.log(errorMessage);
                    logObj.push(errorMessage);
                }
            }
            rowCount++;

            return {
                totalPages: itemsResult.data.meta.total_pages,
            }
        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Listing all items\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }

    let { totalPages } = await allItems();

    for (let i = 0; i < totalPages; i++) {
        await allItems();
    }

    let returnObj = { resArr, logObj, runCount }
    return returnObj;
}

async function getHub (token) {
    let logObj = [];

    const result = await axios({
        url: `https://v2.api.uberflip.com/hubs`,
        method: "get",
        params: {
            limit: 100
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const res = result.data.data;

    for (let i = 0; i < res.length; i++) {
        let name = res[i].name;
        let id = res[i].id; 

        let resultString = `Hub Name: ${name}\nId: ${id}\n`;
        logObj.push(resultString);
    }
    return logObj;
}

module.exports = {
    tagGroup,
    tagId,
    itemTags,
    hiddenStreamItems,
    pastContentItems,
    users,
    groups,
    streams,
    allBlogItems,
    streamsBlogItems,
    getTaggedItems,
    getHub
};