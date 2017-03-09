// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  ///// GENERAL ROUTES //////
  // Each of the below routes just handles the HTML page that the user gets sent to.
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/auth.html"));
  });
  app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });
  app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });

  ///// ADMIN ROUTES //////

  // index route loads view.html
  app.get("/admin/index", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/admin/index.html"));
  });

  // cms route loads cms.html
  app.get("/admin/menu", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/admin/menu.html"));
  });

  // blog route loads blog.html
  app.get("/admin/reserve", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/admin/reserve.html"));
  });

  // authors route loads author-manager.html
  app.get("/admin/events", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/admin/events.html"));
  });

  // authors route loads author-manager.html
  app.get("/admin/reviews", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/admin/reviews.html"));
  });

  // authors route loads author-manager.html
  app.get("/admin/contact", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/admin/contact.html"));
  });


};
