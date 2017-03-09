var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("../models");


// Direct to home page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/auth.html"));
});

router.get("/events", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/events.html"));
});

// Listen for burger owner
router.post("/api/newUser", function (req, res) {
  // user's email will be unique
  var checkEmail = req.body.email;
  // creating object to send to db
  var userObject = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    user_name: req.body.username,
    email: req.body.email
  };

  // check if the e-mail exists, add the user if no email
  db.users.findAll({
    where: {
      email: checkEmail
    }
  })
    .then(function (result) {
      if (result.length === 0) {
        db.users.create(userObject).then(function (result) {
          res.json("new user has been added");
        });
      }
    });


});


module.exports = router;