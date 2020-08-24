const express = require('express');
const app     = express();
const https   = require('https');
const cors    = require('cors');
const fs      = require('fs');
const key     = fs.readFileSync('./key.pem');
const cert    = fs.readFileSync('./cert.pem');
const server  = https.createServer({key: key, cert: cert }, app);
const port    = 8080;

app.use(cors());
app.use(express.json());

const uploadRouter = require('./routes/upload-router.js');
//const replaceRouter = require('./routes/replaces.js');
const deleteRouter = require('./routes/delete-router.js');

app.use('/upload', uploadRouter);
//app.use('/replace', replaceRouter);
app.use('/delete', deleteRouter);

server.listen(port, function() 
{
  console.log('Secure server deployed...\nListening at address localhost:' + port + '\n');
});