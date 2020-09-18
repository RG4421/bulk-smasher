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

async function users (existingUsers, newUsers, userGroups) {
    const resArr = [];

    // Looping through new users 
    // Extracting their email and group to create master list
    for (var i = 0; i < newUsers.length; i++) {
        const newUser = newUsers[i];

        // Looping through existing users to pull id
        for (var j = 0; j < existingUsers.length; j++) {
            const obj = {};
            const user = existingUsers[j];
        
            for (var k = 0; k < userGroups.length; k++) {
                const groups = userGroups[k];
                const groupId = groups.id;
                const groupName = groups.name;

                if ( (newUser.group === groupName) && (newUser.email === user.email) ) {
                    obj['userId'] = user.id;
                    obj['groupId'] = groupId;
                    resArr.push(obj);
                }
            }
        }
    }
    return resArr;
}

module.exports = { 
    tags,
    users
};