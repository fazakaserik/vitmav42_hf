var port = 3000;

var express = require("express");
var app = express();

app.use(express.static("static"));

/**
 * Include all routes.
 */
require("./routes/onetask")(app);

var server = app.listen(port, function () {
    console.log("Express running on port " + port + "!");
});