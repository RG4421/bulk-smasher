const axios = require('axios');

async function pastContent (token, csv, selectValue) {
    var BOOL = 0;
    if (selectValue === 'Hide Past Content') {
        BOOL = true;
    } else if (selectValue === 'Show Past Content') {
        BOOL = false;
    }

    for (var i = 0; i < csv.length; i++) {
        var streamId = csv[i].stream_id;
        var temp = csv[i];
        var props = Object.keys(temp);

        for (var j = 1; j < props.length; j++) {
            var itemName = props[j];
            var itemId = temp[itemName];

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

    for (var i = 0; i < csv.length; i++) {
        var temp = csv[i];
        var itemId = temp.item_id;
        var authorId = temp.author_id;
        var props = Object.keys(temp);

        for (var j = 2; j < props.length; j++) {
            var authorName = props[j];
            var fullName = temp[authorName];
            var name = fullName.split(' ');
            var firstName = name[0];
            var lastName = name[1];

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

    for (var i = 0; i < csv.length; i++) {
        var temp = csv[i];
        var itemId = temp.item_id;
        var canonURL = temp.canonical_url;
        var seoTitle = temp.seo_title;
        var seoDesc = temp.seo_description;

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

    for (var i = 0; i < csv.length; i++) {
        var temp = csv[i];
        var itemId = temp.item_id;
        var description = temp.description;
        var thumbnailUrl = temp.thumbnail_url;
        var author = temp.author;
        var authorId = temp.author_id;
        var status = temp.status;
        var bool = 0;

        if (status === 'Show') {
            bool = false;
        } else if (status === 'Hide') {
            bool = true;
        }

        var name = author.split(' ');
        var firstName = name[0];
        var lastName = name[1];

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

module.exports = { 
    pastContent,
    author,
    seo,
    metadata
};