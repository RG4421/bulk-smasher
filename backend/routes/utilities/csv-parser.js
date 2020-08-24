const csv = require('csv-parser');

async function parseCSV (data) {

    const parsedData = await csv(data);

    console.log(parsedData);

}

module.exports = { parseCSV };