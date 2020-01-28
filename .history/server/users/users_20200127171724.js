require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = express.Router();


var app = express();

const passport = require("passport");

const rtsIndex = require("./routes/index.router");

// var app = express();

// middleware
// app.use(bodyParser.json());
// app.use(cors());
app.use(passport.initialize());
// app.use("/users", rtsIndex);
router.post("/users", rtsIndex);

