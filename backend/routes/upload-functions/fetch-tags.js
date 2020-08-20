const axios = require('axios');

async function fetchTags(userToken) {
  let result;
  let runCount = 1;
  let pageCountModifier = `page=${runCount}`;
  let URL = `https://v2.api.uberflip.com/tags?limit=100&${pageCountModifier}`;

  async function tagRequest() { 
    try {
      result = await axios({
        url: URL,
        method: 'get',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
    runCount++;
    pageCountModifier = `page=${runCount}`;
    URL = `https://v2.api.uberflip.com/tags?limit=100&${pageCountModifier}`;

    return {
      returnedTags: result.data.data,
      totalPages: result.data.meta.total_pages,
    }
  }

  let userTags = [];
  let { returnedTags, totalPages } = await tagRequest();
  userTags.push(...returnedTags);

  for (let i = 1; i < totalPages; i++ ) {
    let { returnedTags } = await tagRequest();
    userTags.push(...returnedTags);
  }

  return userTags;
};

module.exports = (args) => {
  const userTags = fetchTags(args);
  return userTags;
};