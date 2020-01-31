var Quizques = require('../models/quiz_questions.model');

// Get all Quiz
exports.getallquiz = function (req, res) {
    Quizques.find({}, function (err, data) {
        if (err)
            res.send('error');
        else {
            //console.log(JSON.stringify(data));  
            res.send(data);
        }
    })
};