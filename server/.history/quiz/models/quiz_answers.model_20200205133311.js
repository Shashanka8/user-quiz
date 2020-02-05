const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QuizSchema = new Schema({
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

module.exports = mongoose.model('quizSchema', QuizSchema);
// mongoose.model("Quiz", quizSchema);
