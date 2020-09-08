const axios = require("axios");

// Fetches tag group id
async function tagGroup(token) {
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
        console.log(err);
    }
}

// Fetches all tag ids
async function tagId(token) {
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
        console.log(err);
    }
}

// Fetches all items
async function itemTags(token) {
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
        console.log(err);
    }
}

// Fetching stream item's hidden items
async function hiddenStreamItems(token, data) {
    const resultArr = [];

    for (var i = 0; i < data.length; i++) {
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

            for (var j = 0; j < streamItemData.length; j++) {
                if (streamItemData[j].hidden === true) {
                  streamIds[`item_id${j}`] = streamItemData[j].id;
                }
            }
        resultArr.push(streamIds);
        } catch (err) {
            console.log(err);
        }
    }
    return resultArr;
}

// Fetching stream item's prior to selected date
async function pastContentItems(token, data, date) {
    const resultArr = [];

    for (var i = 0; i < data.length; i++) {
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

            for (var j = 0; j < streamItemData.length; j++) {
                const createdDate = streamItemData[j].created_at;

                if (createdDate < date) {
                    streamIds[`item_id${j}`] = streamItemData[j].id;
                }
            }
            resultArr.push(streamIds);
            } catch (err) {
                console.log(err);
            }
        }
    return resultArr;
}

module.exports = {
    tagGroup,
    tagId,
    itemTags,
    hiddenStreamItems,
    pastContentItems,
};
