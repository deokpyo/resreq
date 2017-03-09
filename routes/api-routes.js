var path = require("path");
var db = require("../models");

// Routes =============================================================
module.exports = function (app) {
    //////////// MAIN PAGE ROUTES ////////////
    app.get("/", function (req, res) {
        res.render("index", { title: "Main Page", layout: "main.hbs", condition: false });
    });
    app.get("/about", function (req, res) {
        res.render("about", { title: "About Page", layout: "main.hbs", condition: true });
    });
    app.get("/contact", function (req, res) {
        res.render("contact", { title: "Contact Page", layout: "main.hbs", condition: true });
    });

    //////////// SELECT PAGE ROUTES ////////////
    app.get("/:id/select", function (req, res) {
        res.render("select-index", { title: "Restaurant Selection Page", layout: "main-select.hbs", condition: false });
    });

    //////////// ADMIN PAGE ROUTES ////////////
    app.get("/:id", function (req, res) {
        res.render("admin-index", { title: "Admin Main Page", layout: "main-admin.hbs", condition: false });
    });
    app.get("/:id/menu", function (req, res) {
        res.render("admin-menu", { title: "Admin Menu Page", layout: "main-admin.hbs", condition: true });
    });
    app.get("/:id/reserve", function (req, res) {
        res.render("admin-reserve", { title: "Admin Reservation Page", layout: "main-admin.hbs", condition: true });
    });
    app.get("/:id/event", function (req, res) {
        res.render("admin-event", { title: "Admin Events Page", layout: "main-admin.hbs", condition: true });
    });
    app.get("/:id/review", function (req, res) {
        res.render("admin-review", { title: "Admin Reviews Page", layout: "main-admin.hbs", condition: true });
    });
    app.get("/:id/contact", function (req, res) {
        res.render("admin-contact", { title: "Admin Contact Page", layout: "main-admin.hbs", condition: true });
    });

    //////////// API ROUTES ////////////
    //---------- ADMIN(USER) ROUTES ----------//
    app.get("/api/get/:userId", function (req, res) {
        var userId = req.params.userId;
        db.restaurants.findAll({
            include: [db.users],
            where: {
                userId: userId
            }
        }).then(function (data) {
            res.json(data);
        });
    });
    app.get("/api/user/:user_email", function (req, res) {
        var email = req.params.user_email;
        db.users.findAll({
            where: {
                email: email
            },
        }).then(function (data) {
            res.json(data);
        });
    });
    app.post("/api/create", function (req, res) {
        console.log(req.body);
        db.restaurants.create(
            req.body
        ).then(function (data) {
            res.json(data);
        })
    });

    //---------- ADMIN(USER) ROUTES ----------//
    app.post("/api/newUser", function (req, res) {
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
            // include: [db.users],
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
                else {
                    res.json(result);
                }
            });
    });

    //---------- MENU ROUTES ----------//
    app.post("/api/menu", function (req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property
        db.menus.create(req.body).then(function (dbstart) {
            // We have access to the new appetizer as an argument inside of the callback function
            res.json(dbstart);
        });
    });
    // GET route for getting all of the appetizers
    app.get("/api/menu/:id", function (req, res) {
        // findAll returns all entries for a table when used with no options
        var resId = req.params.id;
        console.log(resId);
        db.menus.findAll({
            include: [db.restaurants],
            where: {
                restaurantId: resId
            }
        }).then(function (dbstart) {
            // We have access to the appetizer as an argument inside of the callback function
            res.json(dbstart);
        });
    });
    // DELETE route for deleting appetizer. We can get the id of the appetizer to be deleted from
    // req.params.id
    app.delete("/api/menu/:id", function (req, res) {
        // We just have to specify which appetizer we want to destroy with "where"
        db.menus.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbStart) {
            res.json(dbStart);
        });

    });
    // PUT route for updating appetizer. We can get the updated appetizers data from req.body
    app.put("/api/menu", function (req, res) {
        // Update takes in an object describing the properties we want to update, and
        // we use where to describe which objects we want to update
        db.menus.update({
            Name: req.body.Name,
            Info: req.body.Info,
            Price: req.body.Price,
            Category: req.body.Category
        }, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbStart) {
                res.json(dbStart);
            });
    });

    //---------- REVIEW ROUTES ----------//
    // INSERT: create a new review
    app.post("/api/review", function (req, res) {
        db.reviews.create(req.body).then(function (dbreviews) {
            res.json(dbreviews);
        });
    });
    // SELECT ALL: get all the reviews associated with the resId
    app.get("/api/review/:resId", function (req, res) {
        var resId = req.params.resId;
        console.log(resId);
        db.reviews.findAll({
            include: [db.restaurants],
            where: {
                restaurantId: resId
            }
        }).then(function (dbreviews) {
            res.json(dbreviews);
        });
    });
    // DELETE: delete a review based on the id
    app.delete("/api/review/:id", function (req, res) {
        db.reviews.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbreviews) {
            res.json(dbreviews);
        });
    });

    //---------- EVENT ROUTES ----------//
    // add new event to calendar
    app.post("/api/newEvent", function (req, res) {

        // db.events.create
        db.events.create(req.body).then(function (result) {
            res.json("new event has been added");
        });
    });

    // return all events to calendar
    app.get("/api/getEvents/:resId", function (req, res) {
        var resId = req.params.resId;
        db.events.findAll({
            include: [db.restaurants],
            where: {
                restaurantId: resId
            }
        }).then(function (result) {
            var eventsArray = [];

            for (var i = 0; i < result.length; i++) {
                var singleEvent = {
                    "id": result[i].dataValues.event_id,
                    "title": result[i].dataValues.title,
                    // "url": result[i].dataValues.event_url,
                    "url": "/api/events/" + result[i].dataValues.event_id,
                    "class": result[i].dataValues.event_type, //event-special, event-information, event-success
                    "start": result[i].dataValues.event_start_time, // Milliseconds
                    "end": result[i].dataValues.event_end_time // Milliseconds
                };
                eventsArray.push(singleEvent);
            }
            var eventInfo = {
                "success": 1,
                "result": eventsArray
            }

            res.json(eventInfo);
        });
    });

    // Display Event Modal - Listener
    app.get("/api/events/:eventID", function (req, res) {
        db.events.findOne({
            where: {
                event_id: req.params.eventID
            }
        }).then(function (result) {
            res.json(result);
        });
    });

};
