const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const users = require('./users/users');
app.use('/api', users);

const quiz = require();
app.use('/api', quiz);