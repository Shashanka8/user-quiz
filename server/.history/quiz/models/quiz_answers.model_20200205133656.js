const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QuizAnsSchema = new Schema({
    userID: {
        type: Number,
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
}, {
    collection: 'quiz_answers'
}
);

module.exports = mongoose.model('quizansSchema', QuizAnsSchema);
// mongoose.model("Quiz", quizSchema);
