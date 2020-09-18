const axios = require('axios');

async function tags (token, data) {

    // Pulling in unique tags to be created
    for (let tagName of data) {
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
            console.log(`Tag ${tagName} created`);

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
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

    // Looping through CSV data
    for (var i = 0; i < data.length; i++) {
        var service;
        const props = data[i];
        const hubId = props.hub_id;
        const title = props.title;
        const description = props.title;
        const noRobots = props.no_robots;
        const listView = props.list_view;
        const readMore = props.read_more;
        const canonicalMeta = props.canonical_meta;
        const canonicalRedirect = props.canonical_redirect;

        if (props.service === "marketing") {
            service = "custom";
        } else if (props.service === "sales") {
            service = "targeted";
        } else if (props.service === "blogpost") {
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
            console.log(`${title} stream created`);

        } catch (err) {
            console.log(err.response.data.errors);
        }
    }
}

module.exports = { 
    tags,
    users,
    streams
};