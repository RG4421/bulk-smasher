async function tagsCSV (csv) {

    var tempObj = {};
    var tempResult = [];
    var result = [];    

    var rows = csv.split("\n");

    // Removing carriage returns from CSV
    for (var i = 0; i < rows.length; i++) {
        var newRow = rows[i].split("\r");
        tempObj = newRow[0];
        tempResult.push(tempObj)
    }

    // Storing headers
    var headers = tempResult[0].split(",");

    // Building JSON object
    // Starting at 1 to skip headers
    for (var j = 1; j < tempResult.length; j++) {
        var currentRow = tempResult[j].split(",");

        // Re-instantiating object to remove re-writes
        var obj = {};
        for (var k = 0; k < headers.length; k++) {
                obj[headers[k]] = currentRow[k];
        }
        result.push(obj);
    }
    return result;
}

async function marketingStreamCSV (csv) {
    console.log(csv);
}

module.exports = { tagsCSV, marketingStreamCSV };