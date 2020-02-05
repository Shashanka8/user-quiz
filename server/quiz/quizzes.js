const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());


require("./models/quiz_answers.model");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/AllQuiz", { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (!err) {
        console.log("MongoDB connection succeeded. - Quiz");
    } else {
        console.log(
            "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
        );
    }
});

const quizIndex = require("./routes/quiz.router");

app.use("/api", quizIndex);

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
var PORT = process.env.PORT || 3300;

app.listen(PORT, () =>
    console.log(`Server started at port : ${PORT}`)
);