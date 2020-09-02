const axios = require('axios');

// Fetches tag group id
async function tagGroup (token) {
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

// Fetches all tag ids
async function tagId (token) {
  try {
    const result = await axios({
        url: 'https://v2.api.uberflip.com/tags',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const tagMetadata = result.data.data;
    return tagMetadata;

  } catch (err) {
      console.log(err);
  }
}

// Fetches all items
async function itemTags (token) {
  try {
    const result = await axios({
        url: 'https://v2.api.uberflip.com/items',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const tagId = result.data.data[0].id;
    return tagId;

  } catch (err) {
    console.log(err);
  }
}

async function streamItems (token, data) {

  const resultArr = [];

  for (var i = 0; i < data.length; i++) {
    const streamId = data[i].stream_id;
    
    try {
      const result = await axios({
          url: `https://v2.api.uberflip.com/streams/${streamId}/items`,
          method: 'get',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });
      
      const streamItemData = result.data.data;
      const obj = {};
      obj['stream_id'] = streamId;
      resultArr.push(obj);

      for (var j = 0; j < streamItemData.length; j++) {
          obj['item_id'] = streamItemData[j].id;
          resultArr.push(obj);
      }

    } catch (err) {
      console.log(err);
    }
  }
  return resultArr;
}

module.exports = { tagGroup, tagId, itemTags, streamItems };