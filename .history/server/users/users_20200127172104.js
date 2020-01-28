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

const ctrlUser = require('./controllers/user.controller');

const jwtHelper = require('./config/jwtHelper');

// middleware
// app.use(bodyParser.json());
// app.use(cors());
app.use(passport.initialize());
// app.use("/users", rtsIndex);

router.post('users/register', ctrlUser.register);
router.post('users/authenticate', ctrlUser.authenticate);
router.get('users/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;
