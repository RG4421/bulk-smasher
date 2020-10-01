const axios = require("axios");

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
        const tagMetadata = result.data.data;
        return tagMetadata;

    } catch (err) {
        console.log(err.response.data.errors);
    }
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
async function pastContentItems (token, data, date) {
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
                const createdDate = streamItemData[j].created_at;

                if (createdDate < date) {
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

async function allBlogItems (token, uniqueSearch) {
    let runCount = 1;
    const resArr = [];

    async function allItems () {
        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/items/`,
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
                
                if (content.includes(uniqueSearch)) {
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

async function streamsBlogItems (token, streamId) {

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
        return result.data.data;

    } catch (err) {
        console.log(err);
    }
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
    streamsBlogItems
};