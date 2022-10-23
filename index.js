var port = 3000;

var express = require("express");
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');   

app.use(express.static("public"));

/**
 * Session above all
 */
app.use(session({
    secret: "spooky scary skeletons",
    cookie: {
        maxAge: 60000
        },
    resave: true,
    saveUninitialized: false
}));

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * Include all routes.
 */
require("./routes")(app);

var server = app.listen(port, function () {
    console.log("Express running on port " + port + "!");
});