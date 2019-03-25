var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Route to handle login attempts. Using passport's local authentication strategy
  // user will be served content based on wether the authentication was successful or not
  app.post("/user/login", passport.authenticate("local"), function(req, res) {
    console.log("redirecting...")
    res.json("home");
  });
  //route for handling new user account creation requests. It will use the requirements and methods 
  //given in the user.js model to attempt to insert a new user record into the Users table of the database
  //if the user account is succesfully created, then the user will automatically be loged in via the 'user/login/' route
  app.post("/new-user/signup", function(req, res){
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    })
    //after succesfully creating the row for the new user, they will be redierected through the user/login route with their credentials
    .then(function(){
      res.redirect(307,  "/user/login")
    }).catch(function(error){
      console.log(error);
      res.json(error);
    })
  })
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
