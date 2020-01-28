const express = require("express");
const router = express.Router();
require("./models/quiz.model");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/AllQuiz", err => {
    if (!err) {
        console.log("MongoDB connection succeeded. - Quiz");
    } else {
        console.log(
            "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
        );
    }
});

const quizController = require('./controllers/quiz.controller')

router.post('/allquiz', quizController.getallquiz);
router.post('/quizbyid/:quizID', quizController.getquizbyid);

module.exports = router;
