const mongoose = require("mongoose");
var quizSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    quizID: {
        type: String,
        required: true,
    },
    results: {
        type: Object,
        required: true
    }
});

mongoose.model("Quiz", quizSchema);
