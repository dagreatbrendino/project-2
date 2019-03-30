require("dotenv").config();
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");




console.log(process.env.CLOUDINARY_URL)
var passport = require("./config/passport");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


// app.use(multer);
// app.use(cloudinaryStorage);

// Handlebars
var hbsHelpers = exphbs.create({
  helpers: {
    isJoinRequest: function (type){
        if (type === "join_request"){
          return true;
        }
        else{
          return false;
        }
    },
    //is used to allow the poster of a task to edit it, also applies to group members page to make sure the user cannot send themselves a message
    //*****actually can just be used as a generic equality operator for hbs***** 
    isUser(userId, posterId){
      console.log(posterId)
      if( userId === posterId){
        return true;
      }
      else{
        return false;
      }
    }
  },
  defaultLayout: "main",
  extname: ".handlebars"
});
app.engine( "handlebars", hbsHelpers.engine);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
