const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QuizQuesSchema = new Schema({
    questionId: { type: Number },
    questionText: { type: String },
    qType: { type: String },
    multiple: { type: Boolean },
    options: { type: Object },
    answer: { type: String },
    explanation: { type: String },
    selectedOption: { type: String }
}, {
    collection: 'quiz_questions'
})

module.exports = mongoose.model('quizquesSchema', QuizQuesSchema);