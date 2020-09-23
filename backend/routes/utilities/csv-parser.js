async function CSV(csv) {
    let tempObj = {};
    let tempResult = [];
    let result = [];
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
    // Starting at 1 to skip headers
    for (let j = 1; j < tempResult.length; j++) {
        let currentRow = tempResult[j].split(",");

        // Re-instantiating object to remove re-writes
        let obj = {};
        for (let k = 0; k < headers.length; k++) {
            obj[headers[k]] = currentRow[k];
        }
        result.push(obj);
    }
    return result;
}

module.exports = { CSV };
