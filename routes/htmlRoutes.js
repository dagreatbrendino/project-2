var db = require("../models");

var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  //user Auth routes
  app.get("/signup", function(req, res){
    res.render("signup");
  })
  

  app.get("/login", function(req, res){
    if(req.user){
      res.redirect("/home");
    }
    res.render("login");
  });

  //Load home page for authenticated user

  app.get("/home",isAuthenticated, function(req, res){
    console.log("redirected")
    console.log(req.user);
    var homeObject = {
      user: "",
      group: "",
      bill: "",
      chore: "",
      grocery: ""
    }
    //If the user has a group send them to the group home page
    if (req.user.GroupId){
      //Find the user row for the logged in user
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then(function(userData){
          homeObject.user = userData
        })
      //find the group row associated with the user
      db.Group.findOne({
        where: {
          id: req.user.GroupId
        }
      }).then(function(groupData){
          homeObject.group = groupData   
        })
      //find all bill rows associated with the group
      db.Bill.findAll({
        where: {
          GroupId: req.user.GroupId
        }
      }).then(function(billData){
        homeObject.bill = billData

      })
      db.Grocery.findAll({
        where: {
          GroupId: req.user.GroupId
        }
      }).then(function(groceryData){
        homeObject.grocery = groceryData;
       
      })    
      db.Chore.findAll({
        where: {
          GroupId: req.user.GroupId
        }
      }).then(function(choreData){
        homeObject.chore = choreData;
        console.log(homeObject);
        //render with the home layout passing the homeObject 
        res.render("home", homeObject);
      })    

    }
    
    //otherwise send them to the page where they can request to join/create groups
    else{
      res.redirect("/groupJoin")
    }
  })
  //route for page where users can join/create groups
  app.get("/groupJoin", isAuthenticated, function(req, res){
    res.render("groupJoin");
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
    //bec adding, might need to remove
  app.get("/tasks", function(req, res) {
    res.render("tasks");
  })

};
