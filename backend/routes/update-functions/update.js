const axios = require('axios');

async function pastContent (token, csv, selectValue) {
    let BOOL = 0;
    if (selectValue === 'Hide Past Content') {
        BOOL = true;
    } else if (selectValue === 'Show Past Content') {
        BOOL = false;
    }

    for (let i = 0; i < csv.length; i++) {
        const streamId = csv[i].stream_id;
        const temp = csv[i];
        const props = Object.keys(temp);

        for (let j = 1; j < props.length; j++) {
            const itemName = props[j];
            const itemId = temp[itemName];

            try {
                const result = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}`,
                    method: 'patch',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        limit: 100,
                    },
                    data: {
                        hidden: BOOL,
                    },
                });
                console.log(`Item ${itemId} updated`);

            } catch (err) {
                console.log(err.response.data.errors);
            }
        }
    }
}

async function author (token, csv) {

    for (let i = 0; i < csv.length; i++) {
        const temp = csv[i];
        const itemId = temp.item_id;
        const authorId = temp.author_id;
        const props = Object.keys(temp);

        for (let j = 2; j < props.length; j++) {
            const authorName = props[j];
            const fullName = temp[authorName];
            const name = fullName.split(' ');
            const firstName = name[0];
            const lastName = name[1];

            try {
                const result = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}`,
                    method: 'patch',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        limit: 100,
                    },
                    data: {
                        author: {
                            id: authorId,
                            first_name: firstName,
                            last_name: lastName
                        }
                    },
                });
                console.log(`Item ${itemId} author updated to ${fullName}`);

            } catch (err) {
                console.log(err.response.data.errors);
            }
        }
    }
}

async function seo (token, csv) {

    for (let i = 0; i < csv.length; i++) {
        const temp = csv[i];
        const itemId = temp.item_id;
        const canonURL = temp.canonical_url;
        const seoTitle = temp.seo_title;
        const seoDesc = temp.seo_description;

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/items/${itemId}`,
                method: 'patch',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    limit: 100,
                },
                data: {                    
                    canonical_url: canonURL,
                    seo_title: seoTitle,
                    seo_description: seoDesc
                },
            });
            console.log(`Item ${itemId} SEO metadata updated`);

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
}

async function metadata (token, csv) {

    for (let i = 0; i < csv.length; i++) {
        const temp = csv[i];
        const itemId = temp.item_id;
        const description = temp.description;
        const thumbnailUrl = temp.thumbnail_url;
        const author = temp.author;
        const authorId = temp.author_id;
        const status = temp.status;
        const bool = 0;

        if (status === 'Show') {
            bool = false;
        } else if (status === 'Hide') {
            bool = true;
        }

        let name = author.split(' ');
        let firstName = name[0];
        let lastName = name[1];

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/items/${itemId}`,
                method: 'patch',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    limit: 100,
                },
                data: {                    
                    description: description,
                    thumbnail_url: thumbnailUrl,
                    hidden: bool,
                    author: {
                        id: authorId,
                        first_name: firstName,
                        last_name: lastName,
                    }
                },
            });
            console.log(`Item ${itemId} SEO metadata updated`);

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
}

async function tagItems (token, data, tagIds) {

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        const itemId = obj.item_id;
        const props = Object.keys(obj);

        // Looping through props of CSV data
        for (let j = 1; j < props.length; j++) {
            const tagName = props[j];
            const tag = obj[tagName];

            // Comparing CSV props to existing tags to be added
            for (let k = 0; k < tagIds.length; k++) {
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
                        console.log(`Tag ${tagName} added to ${itemId}`);
            
                    } catch (err) {
                        console.log(err.response.data.errors);
                    }
                }
            }
        }
    }
}

async function groups (token, data) {

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        const userId = data[i].userId;
        const groupId = data[i].groupId;

        try {                        
            const result = await axios({
                url: `https://v2.api.uberflip.com/users/${userId}/user-groups/${groupId}`,
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(`User ${userId} added to ${groupId}`);

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
}

async function streams (token, data) {

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        const streamId = obj.stream_id;
        const props = Object.keys(obj);

        // Looping through props of CSV data
        // Skipping item id
        for (let j = 1; j < props.length; j++) {
            const item = props[j];
            const itemId = obj[item];

            try {                        
                const result = await axios({
                    url: `https://v2.api.uberflip.com/streams/${streamId}/items/${itemId}`,
                    method: 'patch',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(`Stream ${streamId} added item ${itemId}`);
    
            } catch (err) {
                console.log(err.response.data.errors);
            }
        }
    }
}

async function embedContent (token, data) {

    for (let i = 0; i < data.length; i++) {
        let itemId = data[i].id;
        let content = data[i].content;
        var datetime = new Date();

        let updatedContent = content.replace("youtube.com", "youtube-nocookie.com");

        // console.log(`Item ${itemId}`);
        // console.log(`${updatedContent}`);
        // console.log("\n");

        try {
            const itemResult = await axios({
                url: `https://v2.api.uberflip.com/items/${itemId}`,
                method: 'patch',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    limit: 100,
                },
                data: {
                    content: {
                        draft: `${updatedContent}`
                    }
                }
            });
            console.log(`Item ${itemId} embed URL updated`);

            try {
                const publishResult = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: datetime
                    }
                });
                console.log(`Item ${itemId} published`);

            } catch (err) {
                console.log(err.response.data.errors);
            }

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
}

module.exports = { 
    pastContent,
    author,
    seo,
    metadata,
    tagItems,
    groups,
    streams,
    embedContent,
};