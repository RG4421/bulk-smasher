const axios = require('axios');
const dateFormat = require('dateFormat');

async function tags (token, data) {
    let logObj = [];

    // Pulling in unique tags to be created
    for (let tagName of data) {
        const dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

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
            const resultString = `${dateTime}  -  CREATED TAG - '${tagName}'\n`;
            logObj.push(resultString);
            console.log(resultString);

        } catch (err) {
            const errorMessage = `${dateTime}  -  ERROR at ${tagName}` + err.response.data.errors;
            logObj.push(errorMessage);
            throw Error(`${dateTime}  -  Error creating tag '${tagName}'`);
        }
    }
    return logObj;
}

async function users (token, data) {
    const user = [];

    // Looping through CSV data
    for (var i = 0; i < data.length; i++) {
        const obj = {};
        const props = data[i];

        const firstName = props.first_name;
        const lastName = props.last_name;
        const email = props.email;
        const twitterHandle = props.twitter_handle;
        const linkedIn = props.linkedin_profile_url;
        const bio = props.bio;
        const group = props.group;

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
            console.log(`User ${firstName} ${lastName} created`);

        } catch (err) {
            console.log(err.response.data.errors);
        }       
    }
    return user;
}

async function streams (token, data) {
    let resArr = [];

    // Looping through CSV data
    for (let i = 0; i < data.length; i++) {
        var service;
        const prop = data[i];
        const hubId = prop.hub_id;
        const title = prop.title;
        const description = prop.title;
        const noRobots = prop.no_robots;
        const listView = prop.list_view;
        const readMore = prop.read_more;
        const canonicalMeta = prop.canonical_meta;
        const canonicalRedirect = prop.canonical_redirect;

        const itemProps = Object.keys(prop);

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
            const streamId = result.data.id;
            console.log(`${title} stream created with ID ${streamId}`);

            // Looping through props of CSV data
            // Skipping previous props
            for (let j = 9; j < itemProps.length; j++) {
                const item = itemProps[j];
                const itemId = prop[item];

                try {                        
                    const result = await axios({
                        url: `https://v2.api.uberflip.com/streams/${streamId}/items/${itemId}`,
                        method: 'patch',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    console.log(`Added item ${itemId} to ${streamId}`);
        
                } catch (err) {
                    console.log(err.response.data.errors);
                }
            }
            resArr.push(`${title} stream created`);

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
    return resArr;
}

async function items (token, data) {

    for (let i = 0; i < data.length; i++) {
        const prop = data[i];
        const hubId = prop.hub_id;
        const streamId = prop.stream_id;
        const title = prop.title;
        const description = prop.description;
        const content = prop.content;
        const thumbnailUrl = prop.thumbnail_url;
        const author = prop.author;
        const seoTitle = prop.seo_title;
        const seoDescription = prop.seo_description;
        const canonicalURL = prop.canonical_url;
        const dateTime = new Date();

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
                    published_at: dateTime,
                    hidden: false,
                }
            });
            const itemId = result.data.id;
            console.log(`Item ${itemId} created in stream ${streamId}`);

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
    tags,
    users,
    streams,
    items
};