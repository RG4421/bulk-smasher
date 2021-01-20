const axios = require('axios');
const dateFormat = require('dateformat');

async function pastContent (token, csv, selectValue) {
    let logObj = [];
    let BOOL = 0;
    let runCount = 0;

    if (selectValue === 'Hide Past Content') {
        BOOL = true;
    } else if (selectValue === 'Show Past Content') {
        BOOL = false;
    }

    for (let i = 0; i < csv.length; i++) {
        let temp = csv[i];
        let props = Object.keys(temp);
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;

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
                runCount++;
                logObj.push(resultString);
                console.log(resultString);

                if (result.data.published_at != null) {
                    pubDate = result.data.published_at
                } else {
                    pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
                }

                try {
                    await axios({
                        url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        data: {
                            published_at: pubDate
                        }
                    });
                    let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                    runCount++;
                    logObj.push(resultString);
                    console.log(resultString);
                    
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                    runCount++;
                    console.log(errorMessage);
                    logObj.push(errorMessage);
                }

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}'\n`;
                runCount++;
                logObj.push(errorMessage);
            }
        }
    }

    let returnObj = { logObj, runCount };

    return returnObj;
}

async function author (token, csv) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < csv.length; i++) {
        let temp = csv[i];
        let itemId = temp.item_id;
        let authorId = temp.author_id;
        let props = Object.keys(temp);
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;

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
                runCount++;
                logObj.push(resultString);

                if (result.data.published_at != null) {
                    pubDate = result.data.published_at
                } else {
                    pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
                }

                try {
                    await axios({
                        url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        data: {
                            published_at: pubDate
                        }
                    });
                    let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                    runCount++;
                    logObj.push(resultString);
                    console.log(resultString);
                    
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                    runCount++;
                    console.log(errorMessage);
                    logObj.push(errorMessage);
                }

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}' to author '${fullName}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

async function seo (token, csv) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < csv.length; i++) {
        let BOOL;
        let temp = csv[i];
        let itemId = temp.item_id;
        let canonURL = temp.canonical_url;
        let seoTitle = temp.seo_title;
        let seoDesc = temp.seo_description;
        let canonRedirect = temp.canonical_redirect;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;

        if (canonRedirect === "TRUE") {
            BOOL = true;
        } else if (canonRedirect === "FALSE") {
            BOOL = false;
        }

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
                    seo_description: seoDesc,
                    canonical_redirect: BOOL
                    },
            });
            let resultString = `${dateTime}  -  UPDATED SEO -  Item '${itemId}' SEO metadata updated\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);

            if (result.data.published_at != null) {
                pubDate = result.data.published_at
            } else {
                pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
            }

            try {
                await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: pubDate
                    }
                });
                let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);
                
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}'\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

async function metadata (token, csv) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < csv.length; i++) {
        let temp = csv[i];
        let itemId = temp.item_id;
        let description = temp.description;
        let thumbnailUrl = temp.thumbnail_url;
        let author = temp.author;
        let authorId = temp.author_id;
        let status = temp.status;
        let bool = 0;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;


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
            runCount++;
            logObj.push(resultString);
            console.log(resultString);

            if (result.data.published_at != null) {
                pubDate = result.data.published_at
            } else {
                pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
            }

            try {
                await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: pubDate
                    }
                });
                let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);
                
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}'\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

async function tagItems (token, newTags, tagIds) {
    let logObj = [];
    let runCount = 0;
    
    // Looping through CSV data
    for (let i = 0; i < newTags.length; i++) {
        const dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        const obj = newTags[i];
        const itemId = obj.item_id;
        const props = Object.keys(obj);

        // Looping through props of CSV data
        // Skipping itemId
        for (let j = 1; j < props.length; j++) {
            const tagHeader = props[j];
            const tag = obj[tagHeader];

            // Comparing CSV props to existing tags to be added
            for (let k = 0; k < tagIds.length; k++) {
                const tagId = tagIds[k].id;
                const tagName = tagIds[k].name;

                // Added tag to item if CSV tag matches existing tag name
                if (tag === tagName) {

                    try {                        
                        await axios({
                            url: `https://v2.api.uberflip.com/items/${itemId}/tags/${tagId}`,
                            method: 'put',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        let resultString = `${dateTime}  -  UPDATED ITEM  -  Item '${itemId}' tagged with '${tag}'\n`;
                        runCount++;
                        logObj.push(resultString);
                        console.log(resultString);
            
                    } catch (err) {
                        let thrownError = err.response.data.errors[0].message;
                        let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}' with tag '${tag}'\n`;
                        runCount++;
                        console.log(errorMessage);
                        logObj.push(errorMessage);
                    }
                }
            }
        }
    }

    let returnObj = { logObj, runCount }

    return returnObj;
}

async function groups (token, data) {
    let logObj = [];
    let runCount = 0;

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        let userId = data[i].userId;
        let groupId = data[i].groupId;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {                    
            await axios({
                url: `https://v2.api.uberflip.com/users/${userId}/user-groups/${groupId}`,
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            let resultString = `${dateTime}  -  UPDATED GROUP  -  User '${userId}' added to group '${groupId}'\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating user '${userId}' to group '${groupId}'\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
}

async function streams (token, data) {
    let logObj = [];
    let runCount = 0;

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
                await axios({
                    url: `https://v2.api.uberflip.com/streams/${streamId}/items/${itemId}`,
                    method: 'patch',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                let resultString = `${dateTime}  -  UPDATED STREAM  -  Stream '${streamId}' added item '${itemId}'\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);
    
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Adding item '${itemId}' to Stream '${streamId}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }
        }
    }
    let returnObj = { logObj, runCount }
    return returnObj;
}

async function allEmbedContent (token, data, search, replace) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < data.length; i++) {
        let itemId = data[i].id;
        let content = data[i].content;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;

        let updatedContent = content.replace(search, replace);

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
                    content: {
                        draft: `${updatedContent}`
                    }
                }
            });
            let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' embedded content updated\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);

            if (result.data.published_at != null) {
                pubDate = result.data.published_at
            } else {
                pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
            }

            try {
                await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: pubDate
                    }
                });
                let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' published\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }
        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating '${itemId}' embedded content\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    let returnObj = { logObj, runCount }
    return returnObj;
}

async function streamEmbedContent (token, data, search, replace) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < data.length; i++) {
        let itemId = data[i].id;
        let content = data[i].content;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;

        let updatedContent = content.replace(search, replace);

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
                    content: {
                        draft: updatedContent
                    }
                }
            });
            let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' embedded content updated\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);

            if (result.data.published_at != null) {
                pubDate = result.data.published_at
            } else {
                pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
            }

            try {
                await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: pubDate
                    }
                });
                let resultString = `${dateTime}  -  UPDATED EMBEDDED CONTENT  -  Item '${itemId}' published\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);

            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating '${itemId}' embedded content\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    let returnObj = { logObj, runCount }
    return returnObj;
}

async function items (token, csv) {
    let logObj = [];
    let runCount = 0;

    for (let i = 0; i < csv.length; i++) {
        let prop = csv[i];
        let itemId = prop.item_id;
        let title = prop.title;
        let description = prop.description;
        let content = prop.source_content;
        let author = prop.author;
        let thumbnailUrl = prop.thumbnail_url;
        let seoTitle = prop.seo_title;
        let seoDescription = prop.seo_description;
        let canonicalURL = prop.canonical_url;
        let status = prop.status;
        let bool = 0;
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;
        let firstName;
        let lastName;

        if (status === 'Show') {
            bool = false;
        } else if (status === 'Hide') {
            bool = true;
        }

        if (author) {
            let name = author.split(' ');
            firstName = name[0];
            lastName = name[1];    
        }

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
                    title: title,            
                    description: description,
                    content: {
                        draft: content,
                    }, 
                    author: {
                        first_name: firstName,
                        last_name: lastName,
                    },
                    seo_title: seoTitle,
                    seo_description: seoDescription,
                    thumbnail_url: thumbnailUrl,
                    canonical_url: canonicalURL,
                    hidden: bool,
                },
            });
            let resultString = `${dateTime}  -  UPDATED ITEMS  -  Item '${itemId}' metadata updated\n`;
            runCount++;
            logObj.push(resultString);
            console.log(resultString);

            if (result.data.published_at != null) {
                pubDate = result.data.published_at
            } else {
                pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
            }

            try {
                await axios({
                    url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    data: {
                        published_at: pubDate
                    }
                });
                let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);
                
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }

        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating item '${itemId}'\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    let returnObj = { logObj, runCount }
    return returnObj;
}

async function canonical (token, data, canonical, selection) {
    let logObj = [];
    let runCount = 0;
    let newCanonical;

    for (let itemId of data) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let pubDate;

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/items/${itemId}`,
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    limit: 100,
                },
            });

            let canonicalURL = result.data.canonical_url;

            if (selection === "Prepend") {

                let http = 'http://';
                let temp = canonicalURL.split(http);

                newCanonical = http + canonical + '-' + temp[1];

            } else if (selection === "Append") {
                newCanonical = canonicalURL.concat(canonical);
            }

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
                        canonical_url: newCanonical
                    }
                });

                let resultString = `${dateTime}  -  TAG SEARCH ITEMS  -  Item '${itemId}' canonical updated\n`;
                runCount++;
                logObj.push(resultString);
                console.log(resultString);

                if (result.data.published_at != null) {
                    pubDate = result.data.published_at
                } else {
                    pubDate = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
                }

                try {
                    await axios({
                        url: `https://v2.api.uberflip.com/items/${itemId}/publish`,
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        data: {
                            published_at: pubDate
                        }
                    });
                    let resultString = `${dateTime}  -  Published item '${itemId}'\n`;
                    runCount++;
                    logObj.push(resultString);
                    console.log(resultString);
                    
                } catch (err) {
                    let thrownError = err.response.data.errors[0].message;
                    let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Publishing item '${itemId}'\n`;
                    runCount++;
                    console.log(errorMessage);
                    logObj.push(errorMessage);
                }
            } catch (err) {
                let thrownError = err.response.data.errors[0].message;
                let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Updating items canonical URL '${itemId}'\n`;
                runCount++;
                console.log(errorMessage);
                logObj.push(errorMessage);
            }
        } catch (err) {
            let thrownError = err.response.data.errors[0].message;
            let errorMessage = `${dateTime}  -  ERROR: ${thrownError}  -  Fetching canonical URL '${itemId}'\n`;
            runCount++;
            console.log(errorMessage);
            logObj.push(errorMessage);
        }
    }
    let returnObj = { logObj, runCount };
    return returnObj;
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
    streamEmbedContent,
    items,
    canonical
};
