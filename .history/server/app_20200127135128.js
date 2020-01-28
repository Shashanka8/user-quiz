require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

var app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, err => {
    if (!err) {
        console.log("MongoDB connection succeeded.");
    } else {
        console.log(
            "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
        );
    }
});

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// error handler
app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
        var valErrors = [];
        Object.keys(err.errors).forEach(key =>
            valErrors.push(err.errors[key].message)
        );
        res.status(422).send(valErrors);
    }
});

// start server

app.listen(process.env.PORT, () =>
    console.log(`Server started at port : ${process.env.PORT}`)
);