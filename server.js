const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());

const uri = process.env.MONGODB_SERVERLESS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const scheduleRouter = require('./routes/schedule');
const authRouter = require('./routes/auth');

server.use('/api/schedule', scheduleRouter);
server.use('/api/v1/auth', authRouter);

server.use(express.static('client/build'));

server.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
