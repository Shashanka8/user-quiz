require("./config/config");
// require("./models/db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const passport = require("passport");

const mongoose = require("mongoose");

require("./models/user.model");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (!err) {
        console.log("MongoDB connection succeeded. - Users");
    } else {
        console.log(
            "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
        );
    }
});

require("./config/passportConfig");


const userIndex = require("./routes/user.router");


// middleware
app.use(passport.initialize());
app.use("/api", userIndex);


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
var PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server started at port : ${PORT}`)
);
