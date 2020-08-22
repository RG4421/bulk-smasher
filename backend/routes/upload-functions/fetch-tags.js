const axios = require('axios');

async function fetchTags (token) {
  try {
    const result = await axios({
        url: 'https://v2.api.uberflip.com/tags',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const tagGroupID = result.data.data[0].tag_group_id;
    return tagGroupID;

  } catch (err) {
    console.log(err);
  }
}