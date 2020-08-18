try
{
    var express    = require('express');
    var app        = express();
    //var cors       = require('cors');
    //var bodyParser = require('body-parser');
    var port       = 8080;

    console.log("\nAll necessary packages included...");
}
catch(e) { console.log("Errors including packages: " + (e)); };

app.use(express.json());

// Listening to requests sent by client
app.listen(port, function() 
{
  console.log('Server deployed...\nListening at address localhost:' + port + '\n');
});