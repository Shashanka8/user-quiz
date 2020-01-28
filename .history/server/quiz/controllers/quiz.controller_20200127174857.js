var Quiz = require('../models/quiz.model');

// Get all Quiz
exports.getallquiz = function (req, res) {
    Quiz.find({}, function (err, data) {
        if (err)
            res.send('error');
        else {
            //console.log(JSON.stringify(data));  
            res.send(data);
        }
    })
};

// Get all Quiz
exports.getquizbyid = function (req, res) {
    Quiz.find({ quizID: req.params.quizID }, function (err, data) {
        if (err)
            res.send('error');
        else {
            //console.log(JSON.stringify(data));  
            res.send(data);
        }
    })
};