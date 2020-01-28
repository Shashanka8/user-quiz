const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz.controller')

router.get('/allquiz', quizController.getallquiz);
router.get('/quizbyid/:userID/:quizID', quizController.getquizbyid);
router.post('/createresultdetails', quizController.createresultdetails);

module.exports = router;