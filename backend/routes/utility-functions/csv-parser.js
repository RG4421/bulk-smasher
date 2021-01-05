async function CSV(csv, searchKey) {
    const comma = ",";
    let tempObj = {};
    let tempResult = [];
    let result = [];
    let replaceObj;
    let rows = csv.split("\n");

    // Removing carriage returns from CSV
    for (let i = 0; i < rows.length; i++) {
        let newRow = rows[i].split("\r");
        tempObj = newRow[0];
        tempResult.push(tempObj);
    }
    // Storing headers
    let headers = tempResult[0].split(",");

    // Building JSON object
    // Starting at 1 to skip CSV headers
    for (let j = 1; j < tempResult.length; j++) {
        let currentRow = tempResult[j].split(",");

        // Re-instantiating object to remove overwrites
        // Looking through every row with header value to replace symbol with comma
        let obj = {};
        for (let k = 0; k < headers.length; k++) {
            obj[headers[k]] = currentRow[k];

            if (searchKey !== "" && obj[headers[k]]) {
                replaceObj = obj[headers[k]].replaceAll(searchKey, comma);
                obj[headers[k]] = replaceObj;
            } else {
                obj[headers[k]] = replaceObj;
            }
        }
        result.push(obj);
    }
    return result;
}

module.exports = { CSV };