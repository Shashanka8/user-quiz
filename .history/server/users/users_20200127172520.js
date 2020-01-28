require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

var app = express();

const passport = require("passport");

// const rtsIndex = require("./routes/index.router");

const router = express.Router();

const userController = require('./controllers/user.controller');

const jwtHelper = require('./config/jwtHelper');

// middleware
app.use(passport.initialize());
// app.use("/users", rtsIndex);

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);

module.exports = router;
