var Quizans = require('../models/quiz_answers.model');

// Get all Quiz
// exports.getallquiz = function (req, res) {
//     Quiz.find({}, function (err, data) {
//         if (err)
//             res.send('error');
//         else {
//             //console.log(JSON.stringify(data));  
//             res.send(data);
//         }
//     })
// };

// Get Quiz by id
exports.getquizresultbyid = function (req, res) {
    Quizans.find({ userID: req.params.userID, quizID: req.params.quizID }, function (err, data) {
        if (err)
            res.send('error');
        else {
            //console.log(JSON.stringify(data));  
            res.send(data);
        }
    })
};

// Create new Quiz Details
exports.createquizresult = function (req, res) {
    var quizans = new Quizans(req.body);
    quizans.save(function (err) {
        if (err)
            res.send('error');
        else
            res.send('success');
    })
};