const axios = require('axios');
const dateFormat = require('dateFormat');

async function tags (token, data) {
    let logObj = [];

    // Pulling in unique tags to be created
    for (let tagName of data) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            const tagGroupId = async => tags.fetchTagGroup(token);
            
            const result = await axios({
                url: 'https://v2.api.uberflip.com/tags',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    tag_group_id: tagGroupId,
                    name: tagName,
                },
            });
            let resultString = `${dateTime}  -  CREATED TAG  -  '${tagName}'\n`;
            logObj.push(resultString);
            console.log(resultString);

        } catch (err) {
            const errorMessage = `${dateTime}  -  ERROR at ${tagName}` + err.response.data.errors;
            logObj.push(errorMessage);
            throw Error(errorMessage);
        }
    }
    return logObj;
}

async function users (token, data) {
    let logObj = [];
    let user = [];

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        let obj = {};
        let props = data[i];

        let firstName = props.first_name;
        let lastName = props.last_name;
        let email = props.email;
        let twitterHandle = props.twitter_handle;
        let linkedIn = props.linkedin_profile_url;
        let bio = props.bio;
        let group = props.group;

        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        obj['email'] = email;
        obj['group'] = group;
        user.push(obj);

        try {                        
            const result = await axios({
                url: `https://v2.api.uberflip.com/users`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    twitter_handle: twitterHandle,
                    linkedin_profile_url : linkedIn,
                    bio: bio
                }
            });
            let resultFName = result.data.first_name;
            let resultLName = result.data.last_name;
            let userId = result.data.id;

            let resultString = `${dateTime}  -  CREATED USER  -  '${resultFName} ${resultLName}' with ID '${userId}'\n`;
            logObj.push(resultString);
            console.log(resultString);

        } catch (err) {
            let errorMessage = `${dateTime}  -  ERROR at '${firstName} ${lastName}'` + err.response.data.errors;
            logObj.push(errorMessage);
            throw Error(errorMessage);
        }       
    }
    let returnObj = {user, logObj}
    return returnObj;
}

async function streams (token, data) {
    let logObj = [];

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        var service;
        let prop = data[i];
        let hubId = prop.hub_id;
        let title = prop.title;
        let description = prop.title;
        let noRobots = prop.no_robots;
        let listView = prop.list_view;
        let readMore = prop.read_more;
        let canonicalMeta = prop.canonical_meta;
        let canonicalRedirect = prop.canonical_redirect;

        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        let itemProps = Object.keys(prop);

        if (prop.service === "marketing") {
            service = "custom";
        } else if (prop.service === "sales") {
            service = "targeted";
        } else if (prop.service === "blogpost") {
            service = "blogpost";
        }

        try {                        
            const result = await axios({
                url: `https://v2.api.uberflip.com/streams`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    hub_id: hubId,
                    title: title,
                    description: description,
                    service: service,
                    no_robots: noRobots,
                    template_data: {
                        list_view: listView,
                        read_more: readMore,
                        canonical_meta: canonicalMeta,
                        canonical_redirect: canonicalRedirect
                    },
                    hidden: true,
                    exclude_from_search: true
                }
            });
            let streamTitle = result.data.title; 
            let streamId = result.data.id;

            let resultString = `${dateTime}  -  CREATED STREAM  -  '${streamTitle}' stream created with ID '${streamId}'\n`;
            logObj.push(resultString);
            console.log(resultString);

            // Looping through props of CSV data
            // Skipping previous props
            for (let j = 9; j < itemProps.length; j++) {
                let item = itemProps[j];
                let itemId = prop[item];

                try {                        
                    const result = await axios({
                        url: `https://v2.api.uberflip.com/streams/${streamId}/items/${itemId}`,
                        method: 'patch',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    let resultString = `${dateTime}  -  UPDATED STREAM  -  Item ${itemId} added to '${streamId}'\n`;
                    logObj.push(resultString);
                    console.log(resultString);
        
                } catch (err) {
                    let errorMessage = `${dateTime}  -  ERROR stream ${streamTitle} at ${itemId}` + err.response.data.errors;
                    logObj.push(errorMessage);
                    throw Error(errorMessage);
                }
            }

        } catch (err) {
            let errorMessage = `${dateTime}  -  ERROR at creating stream '${title}'` + err.response.data.errors;
            logObj.push(errorMessage);
            throw Error(errorMessage);
        }
    }
    return logObj;
}

async function items (token, data) {
    let logObj = [];

    for (let i = 0; i < data.length; i++) {
        let prop = data[i];
        let hubId = prop.hub_id;
        let streamId = prop.stream_id;
        let title = prop.title;
        let description = prop.description;
        let content = prop.content;
        let thumbnailUrl = prop.thumbnail_url;
        let author = prop.author;
        let seoTitle = prop.seo_title;
        let seoDescription = prop.seo_description;
        let canonicalURL = prop.canonical_url;
        let date = new Date();
        const dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        try {
            const result = await axios({
                url: `https://v2.api.uberflip.com/items`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    hub_id: hubId,
                    stream: {
                        id: streamId,
                        ordinal: i
                    },
                    title: title,
                    description: description,
                    content: content,
                    author: {
                        first_name: author,
                    },
                    seo_title: seoTitle,
                    seo_description: seoDescription,
                    thumbnail_url: thumbnailUrl,
                    canonical_url: canonicalURL,
                    published_at: date,
                    hidden: false,
                }
            });
            let itemId = result.data.id;           
            let resultString = `${dateTime}  -  CREATED ITEM  -  Item '${itemId}' created in stream ${streamId}\n`;
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

                let resultString = `${dateTime}  -  UPDATED ITEM  -  Item '${itemId}' published\n`;
                logObj.push(resultString);
                console.log(resultString);

            } catch (err) {
                let errorMessage = `${dateTime}  -  Error publishing item '${itemId}'` + err.response.data.errors;
                logObj.push(errorMessage);
                throw Error(errorMessage);
            }
        } catch (err) {
            let errorMessage = `${dateTime}  -  Error creating item '${title}'` + err.response.data.errors;
            logObj.push(errorMessage);
            throw Error(errorMessage);        
        }
    }
    return logObj;
}

module.exports = { 
    tags,
    users,
    streams,
    items
};