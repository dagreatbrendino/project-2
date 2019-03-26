var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Route to handle login attempts. Using passport's local authentication strategy
  // user will be served content based on wether the authentication was successful or not
  app.post("/user/login", passport.authenticate("local"), function(req, res) {
    console.log("redirecting...")
    //after the user is logged in, ifthey have a group they will be redirected to their home,
    //if they don't have a group, they will be redirected to page where they can make a group 
    //or request to join an existing one 
    if(req.user.GroupId){
      res.json("home");
    }
    else{
      res.json("groupJoin")
    }

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
  //the route for creating new groups. It will get a groupName from the client, and then assign the 
  //id of the user who created the group to the new entry. It will send the data for the new group back to the client
  app.post("/groups/create", function(req, res){
    console.log(req);
    db.Group.create({
      groupName: req.body.groupName,
      creatorId: req.user.id
    })
    .then(function(data){
      console.log("data id ", data.dataValues.id);
      res.send(data);
    })
    .catch(function(error){
      console.log(error);
      res.json(error);
    })
  });
  //this route should be hit after a user creates or joins a group. They will be given a group id from the group they created/
  //joined
  app.put("/user", function(req, res){
    console.log("updating user");
    db.User.update(req.body, 
      {
        where: {
          id: req.user.id
        }
    }).then(function(data){
        //updating the session user GroupId
        req.user.GroupId = req.body.GroupId;
        //redirecting the user to their home page
        return res.status(200).send({result: 'redirect', url:'/home'})
      })

  })
  
};
