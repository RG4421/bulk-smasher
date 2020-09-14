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
        var itemId = csv[i].item_id;
        var temp = csv[i];
        var props = Object.keys(temp);

        for (var j = 1; j < props.length; j++) {
            var authorName = props[j];
            var fullName = temp[authorName];
            var name = fullName.split(' ');
            var firstName = name[0];
            var lastName = name[1];

            //console.log(`Item ${itemId} author updated to ${fullName}`);
            // GET AUTHOR UPDATE WORKING

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
                            'first_name': `${firstName}`,
                            'last_name': `${lastName}`
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

module.exports = { 
    pastContent,
    author
};