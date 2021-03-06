require("./config/config");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

var app = express();

const mongoose = require("mongoose");
require("./models/user.model");

mongoose.connect(process.env.MONGODB_URI, err => {
    if (!err) {
        console.log("MongoDB connection succeeded.");
    } else {
        console.log(
            "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
        );
    }
});

const rtsIndex = require("./routes/index.router");
app.use("/api", rtsIndex);


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