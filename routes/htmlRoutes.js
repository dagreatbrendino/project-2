var db = require("../models");

var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/signup", function(req, res){
    res.render("signup");
  })
  app.get("/home",isAuthenticated, function(req,res){
    console.log("redirected")
    res.render("home")
  })

  app.get("/login", function(req, res){
    if(req.user){
      res.redirect("/home");
    }
    res.render("login");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
