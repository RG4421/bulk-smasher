async function parseCSV (csv) {

    var tempResult = [];
    var tempObj = {};
    var result = [];
    
    var rows = csv.split("\n");

    for (var i = 0; i < rows.length - 1; i++) {
        var newLine = rows[i].split("\r");
        tempObj = newLine[0];
        tempResult.push(tempObj)
    }

    var headers = tempResult[0].split(",");

    // Ignoring header, looping through temp result
    for (var j = 1; j < tempResult.length; j++) {
        var currentRow = tempResult[j].split(",");
        var obj = {};

        for (var k = 0; k < headers.length; k++) {
                obj[headers[k]] = currentRow[k];
        }
        result.push(obj);
    }
    return result;
    //return JSON.stringify(result);
}

module.exports = { parseCSV };