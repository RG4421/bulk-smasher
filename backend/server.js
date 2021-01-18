const express    = require('express');
const app        = express();
const cors       = require('cors');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const path       = require('path');
// const socket     = require('socket.io');

require('dotenv').config();
const port = process.env.HTTP_PORT || 4001;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const authRouter   = require('./routes/auth-router');
const createRouter = require('./routes/create-router');
const updateRouter = require('./routes/update-router');
const deleteRouter = require('./routes/delete-router');
const jobsRouter   = require('./routes/jobs-router')

// Middleware
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, './build')));
app.use(express.static(path.join(__dirname, './build/server-logs')));
app.use('/auth', authRouter);
app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/jobs', jobsRouter);

// Server deployment
app.listen(port, function(err) 
{
    if (err) {
        let dateTime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: username,
                    pass: password
                }
            });
            
            let mailOptions = {
                from: "larsenfriis1@gmail.com",
                to: "larsen.friis@uberflip.com",
                subject: `Bulk Smasher - CRITICAL SERVER ERROR ` + dateTime,
                text: `Error deploying Bulk Smasher server\nError: ${err}`
            };
            
            transporter.sendMail(mailOptions, function(err) {
                if (err) {
                    throw err;
                } else {
                    console.log("Email successfully sent at " + dateTime);
                }
            });

        } catch (err) {
            console.log(dateTime + err);
        }
    } else {
        console.log('Server deployed...listening at port:' + port + '\n');
    }
});

// const io = socket(server);

// io.on('connection', function (socket) {
//     console.log('Connection made: ', socket.id);

//     setTimeout(emitProgress, 30000, socket);

//     // if (interval) {
//     //     clearInterval(interval);
//     // }
//     // interval = setInterval( () => emitProgress(socket), 1000);
//     //     socket.on("disconnect", () => {
//     //     console.log("Client disconnected");
//     //     clearInterval(interval);
//     // });
// });

// const emitProgress = socket => {
//     const response = 'Request pending...'
//     socket.emit("APIProgress", response);
// };