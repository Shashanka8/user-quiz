// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// var app = express();

// // middleware
// app.use(bodyParser.json());
// app.use(cors());

// // var users = require('./users/users');
// // app.use('/api', users);

// // const quiz = require('./quiz/quizzes');
// // app.use('/api', quiz);

// // error handler
// app.use((err, req, res, next) => {
// 	if (err.name === "ValidationError") {
// 		var valErrors = [];
// 		Object.keys(err.errors).forEach(key =>
// 			valErrors.push(err.errors[key].message)
// 		);
// 		res.status(422).send(valErrors);
// 	}
// });

// // start server
// var PORT = process.env.PORT || 3000;

// app.listen(PORT, () =>
// 	console.log(`Server started at port : ${PORT}`)
// );