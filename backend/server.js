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

const createRouter = require('./routes/create-router');
const updateRouter = require('./routes/update-router');
const deleteRouter = require('./routes/delete-router');

app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

server.listen(port, function() {
  console.log('Secure server deployed...\nListening at address localhost:' + port + '\n');
});