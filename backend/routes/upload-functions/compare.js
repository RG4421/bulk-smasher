const axios = require('axios');

async function tags (existingTags, newTags) {

    const itemTagResult = [];
    const createTagResult = [];
   
    // Looping through tags CSV
    // Storing Id for result array
    for (var i = 0; i < newTags.length; i++) {
        var item = newTags[i];
        var itemId = item.item_id;
        var props = Object.keys(newTags[i]);

        // Looping through each tag Id props
        // Skipping itemId position
        for (var j = 1; j < props.length; j++) {
            var tagName = props[j];
            var newTag = item[tagName];

            // Re-instantiating object to ignore re-writes
            const obj = {};

            // Looping through existing tags 
            for (var k = 0; k < existingTags.length; k++) {
                const existingTag = existingTags[k].name;
                                         
                // Checking for duplicate tags
                // If no tag name match, push tag into result array
                if (newTag !== existingTag) {
                    obj[itemId] = newTag;
                    itemTagResult.push(obj);
                    break;
                }
            }
        }
    }
    console.log(itemTagResult);
}

module.exports = { tags };