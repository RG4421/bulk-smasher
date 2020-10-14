const axios = require('axios');
const dateFormat = require('dateFormat');

async function pastContent (token, csv, selectValue) {
    let logObj = [];
    let BOOL = 0;

    if (selectValue === 'Hide Past Content') {
        BOOL = true;
    } else if (selectValue === 'Show Past Content') {
        BOOL = false;
    }

    for (let i = 0; i < csv.length; i++) {
        let streamId = csv[i].stream_id;
        let temp = csv[i];
        let props = Object.keys(temp);
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        for (let j = 1; j < props.length; j++) {
            let itemName = props[j];
            let itemId = temp[itemName];

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
                let resultString = `${dateTime}  -  UPDATED PAST CONTENT  -  Item '${itemId}' updated\n`;
                logObj.push(resultString);
                console.log(resultString);

                try {
                    const publishResult = await axios({
                        url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        data: {
                            published_at: dateTime
                        }
                    });
                    let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                    logObj.push(resultString);
                    console.log(resultString);
                    
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                    console.log(errorMessage);
                    logObj.push(errorMessage);
                }

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}'\n`;
                logObj.push(errorMessage);
            }
        }
    }
    return logObj;
}

async function author (token, csv) {
    let logObj = [];

    for (let i = 0; i < csv.length; i++) {
        let temp = csv[i];
        let itemId = temp.item_id;
        let authorId = temp.author_id;
        let props = Object.keys(temp);
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");


        for (let j = 2; j < props.length; j++) {
            let authorName = props[j];
            let fullName = temp[authorName];
            let name = fullName.split(' ');
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
                        author: {
                            id: authorId,
                            first_name: firstName,
                            last_name: lastName
                        }
                    },
                });
                let resultString = `${dateTime}  -  UPDATED AUTHOR  -  Item '${itemId}' updated to '${fullName}'\n`;
                logObj.push(resultString);

                try {
                    const publishResult = await axios({
                        url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        data: {
                            published_at: dateTime
                        }
                    });
                    let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                    logObj.push(resultString);
                    console.log(resultString);
                    
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                    console.log(errorMessage);
                    logObj.push(errorMessage);
                }

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}' to author '${fullName}'\n`;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }
        }
    }
    return logObj;
}

async function seo (token, csv) {
    let logObj = [];

    for (let i = 0; i < csv.length; i++) {
        let temp = csv[i];
        let itemId = temp.item_id;
        let canonURL = temp.canonical_url;
        let seoTitle = temp.seo_title;
        let seoDesc = temp.seo_description;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

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
            let resultString = `${dateTime}  -  UPDATED SEO -  Item '${itemId}' SEO metadata updated\n`;
            logObj.push(resultString);
            console.log(resultString);

            try {
                const publishResult = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: dateTime
                    }
                });
                let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                logObj.push(resultString);
                console.log(resultString);
                
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}'\n`;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    return logObj;
}

async function metadata (token, csv) {
    let logObj = [];

    for (let i = 0; i < csv.length; i++) {
        let temp = csv[i];
        let itemId = temp.item_id;
        let description = temp.description;
        let thumbnailUrl = temp.thumbnail_url;
        let author = temp.author;
        let authorId = temp.author_id;
        let status = temp.status;
        let bool = 0;
        let time = new Date();
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");


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
            let resultString = `${dateTime}  -  UPDATED METADATA  -  Item '${itemId}' metadata updated\n`;
            logObj.push(resultString);
            console.log(resultString);

            try {
                const publishResult = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: time
                    }
                });
                let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                logObj.push(resultString);
                console.log(resultString);
                
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}'\n`;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    return logObj;
}

async function tagItems (token, newTags, tagIds) {
    let logObj = [];

    // Looping through CSV data
    for (let i = 0; i < newTags.length; i++) {
        const dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        const obj = newTags[i];
        const itemId = obj.item_id;
        const props = Object.keys(obj);

        // Looping through props of CSV data
        // Skipping itemId
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
                        let resultString = `${dateTime}  -  UPDATED ITEM  -  Tag '${tagName}' added to item '${itemId}'\n`;
                        logObj.push(resultString);
                        console.log(resultString);
            
                    } catch (err) {
                        let thrownError = err.response.data.errors[0].message;
                        let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}' with tag '${tagName}'\n`;
                        console.log(errorMessage);
                        logObj.push(errorMessage);
                    }
                }
            }
        }
    }
    return logObj;
}

async function groups (token, data) {
    let logObj = [];

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        let userId = data[i].userId;
        let groupId = data[i].groupId;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {                    
            const result = await axios({
                url: `https://v2.api.uberflip.com/users/${userId}/user-groups/${groupId}`,
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            let resultString = `${dateTime}  -  UPDATED GROUP  -  User '${userId}' added to group '${groupId}'\n`;
            logObj.push(resultString);
            console.log(resultString);

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating user '${userId}' to group '${groupId}'\n`;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    return logObj;
}

async function streams (token, data) {
    let logObj = [];

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        let streamId = obj.stream_id;
        let props = Object.keys(obj);
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        // Looping through props of CSV data
        // Skipping item id
        for (let j = 1; j < props.length; j++) {
            let item = props[j];
            let itemId = obj[item];

            try {                        
                const result = await axios({
                    url: `https://v2.api.uberflip.com/streams/${streamId}/items/${itemId}`,
                    method: 'patch',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                let resultString = `${dateTime}  -  UPDATED STREAM  -  Stream '${streamId}' added item '${itemId}'\n`;
                logObj.push(resultString);
                console.log(resultString);
    
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Adding item '${itemId}' to Stream '${streamId}'\n`;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }
        }
    }
    return logObj;
}

async function allEmbedContent (token, data, search, replace) {
    let logObj = [];

    for (let i = 0; i < data.length; i++) {
        let itemId = data[i].id;
        let content = data[i].content;
        let time = new Date();
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        let updatedContent = content.replace(search, replace);

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
            let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' embedded content updated\n`;
            logObj.push(resultString);
            console.log(resultString);

            try {
                const publishResult = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: time
                    }
                });
                let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' published\n`;
                logObj.push(resultString);
                console.log(resultString);

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }
        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating '${itemId}' embedded content\n`;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    return logObj;
}

async function streamEmbedContent (token, data, search, replace) {
    let logObj = [];

    for (let i = 0; i < data.length; i++) {
        let itemId = data[i].id;
        let content = data[i].content;
        let time = new Date();
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        let updatedContent = content.replace(search, replace);

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
                        draft: updatedContent
                    }
                }
            });
            let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' embedded content updated\n`;
            logObj.push(resultString);
            console.log(resultString);

            try {
                const publishResult = await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: time
                    }
                });
                let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' published\n`;
                logObj.push(resultString);
                console.log(resultString);

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating '${itemId}' embedded content\n`;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    return logObj;
}

module.exports = { 
    pastContent,
    author,
    seo,
    metadata,
    tagItems,
    groups,
    streams,
    allEmbedContent,
    streamEmbedContent
};