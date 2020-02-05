const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz_answers.controller');
const quizQuesContoroller = require('../controllers/quiz_questions.controller')

router.get('/allquiz', quizQuesContoroller.getallquiz);
router.get('/quizresultbyid/:userID/:quizID', quizController.getquizresultbyid);
router.post('/createresultdetails', quizController.createresultdetails);

module.exports = router;