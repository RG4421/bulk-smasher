try
{
    var express    = require('express');
    var app        = express();
    var cors       = require('cors');
    var port       = 8080;

    console.log("\nAll necessary packages included...");
}
catch(e) { console.log("Errors including packages: " + (e)); };

app.use(cors());
app.use(express.json());

var uploadsRouter = require('./routes/uploads.js');

app.use('/upload', uploadsRouter);

// Listening to requests sent by client
app.listen(port, function() 
{
  console.log('Server deployed...\nListening at address localhost:' + port + '\n');
});