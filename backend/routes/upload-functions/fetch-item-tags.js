const axios = require('axios');

async function itemTags (token) {
  try {
    const result = await axios({
        url: 'https://v2.api.uberflip.com/items',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const tagID = result.data.data[0].id;
    console.log(tagID);

    return tagID;

  } catch (err) {
    console.log(err);
  }
}

module.exports = { itemTags };