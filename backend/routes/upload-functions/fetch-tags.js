const axios = require('axios');

async function fetchTagGroup (token) {
  try {
    const result = await axios({
        url: 'https://v2.api.uberflip.com/tags',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const tagGroupId = result.data.data[0].tag_group_id;
    
    return tagGroupId;

  } catch (err) {
    console.log(err);
  }
}

async function fetchTagId (token) {
  try {
    const result = await axios({
        url: 'https://v2.api.uberflip.com/tags',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const metadata = result.data.data;
    
    return metadata;

  } catch (err) {
      console.log(err);
  }
}

module.exports = { fetchTagGroup, fetchTagId };