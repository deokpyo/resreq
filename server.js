// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");
var hbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Set Handlebars.
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "main", layoutsDir: __dirname + "/views/layouts" }));
app.set("view engine", "hbs");

// Routes =============================================================
require("./routes/api-routes.js")(app);
//require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
