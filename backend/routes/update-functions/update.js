const axios = require('axios');

async function pastContent (token, csv) {

    for (var i = 0; i < csv.length; i++) {
        var streamId = csv[i].stream_id;
        var temp = csv[i];
        var props = Object.keys(temp);

        for (var j = 1; j < props.length; j++) {
            var itemName = props[j];
            var itemId = temp[itemName];

            // NOT HIDING AT SOURCE STREAM

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
                    body: {
                        hidden: true,
                    },
                });
            console.log(`Item ${itemId} hidden`);

            } catch (err) {
                console.log(err.response.data.errors);
                //console.log(err);
            }
        }
    }
}

module.exports = { 
    pastContent 
};