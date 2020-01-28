require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const passport = require("passport");

// const rtsIndex = require("./routes/index.router");

const router = express.Router();

const jwtHelper = require('./config/jwtHelper');

// middleware
app.use(passport.initialize());
// app.use("/users", rtsIndex);

const userController = require('./controllers/user.controller');


router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);

// module.exports = router;

// error handler
app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
        var valErrors = [];
        Object.keys(err.errors).forEach(key =>
            valErrors.push(err.errors[key].message)
        );
        res.status(422).send(valErrors);
    }
});

// start server
var PORT = process.env.PORT || 3300;

app.listen(PORT, () =>
    console.log(`Server started at port : ${PORT}`)
);
