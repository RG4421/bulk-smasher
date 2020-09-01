async function tags (existingTags, newTags) {

    let uniqueTags = new Set();
   
    // Looping through tags CSV
    // Storing Id for result array
    for (var i = 0; i < newTags.length; i++) {
        var item = newTags[i];
        //var itemId = item.item_id;
        var props = Object.keys(newTags[i]);

        // Looping through each tag Id props
        // Skipping itemId position
        for (var j = 1; j < props.length; j++) {
            var tagName = props[j];
            var newTag = item[tagName];
            uniqueTags.add(newTag);

            // Looping through existing tags 
            for (var k = 0; k < existingTags.length; k++) {
                const existingTag = existingTags[k].name;
                uniqueTags.delete(existingTag);
            }
        }
    }
    return uniqueTags;
}

module.exports = { tags };