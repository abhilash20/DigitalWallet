const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./src/users/router');


const app = express();
let port = 3000;

mongoose.connect(process.env.DB_URI);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/rest/v1/users', usersRouter);

http.createServer(app).listen(port, () => {
    console.log("application has started");
});
