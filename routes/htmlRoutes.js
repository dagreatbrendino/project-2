var db = require("../models");

var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

var moment = require("moment");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  //user Auth routes
  app.get("/signup", function (req, res) {
    res.render("signup");
  })

  //user login 
  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.render("login");
  });

  //user chat route
  app.get("/chat", function (req, res) {
    res.render("chat");
  })


  //Load home page for authenticated user
  app.get("/home", isAuthenticated, function (req, res) {
    var homeObject = {
      user: "",
      group: "",
      groupMembers: "",
      numMembers: "",
      bill: "",
      totalBills: "",
      grocery: "",
      chore: "",
      currentMonth: "",
      currentYear: "",
      currentDay: ""
    }
    //Find the user row for the logged in user & then assign the value of the User's GroupId from the database to the req.user object
    homeObject.currentMonth = moment().format("MMM");
    homeObject.currentYear = parseInt(moment().format("YYYY"));
    homeObject.currentDay = moment().format("ddd")
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(function (userData) {
      homeObject.user = userData;
      req.user.GroupId = userData.GroupId;
      //If the user has a group send them to the group home page
      if (req.user.GroupId) {
        //find all the group members in the current user's group and return their names and ids
        db.User.findAndCountAll({
          where: {
            GroupId: req.user.GroupId
          },
          attributes: ['name', 'id']
        }).then(function (membersData) {
          homeObject.numMembers = membersData.count;
          homeObject.groupMembers = membersData.rows;
        });
        //find the group row associated with the user
        db.Group.findOne({
          where: {
            id: req.user.GroupId
          }
        }).then(function (groupData) {
          homeObject.group = groupData
        });
        //find all bill rows associated with the group for the current month
        db.Bill.findAll({
          where: {
            GroupId: req.user.GroupId,
            month: homeObject.currentMonth,
            year: homeObject.currentYear
          }
        }).then(function (billData) {
          homeObject.bill = billData
        });

        db.Bill.sum('amount', {
          where: {
            GroupId: req.user.GroupId,
            month: homeObject.currentMonth,
            year: homeObject.currentYear
          }
        }).then(function (billSum) {
          homeObject.totalBills = billSum;
        })
        db.Grocery.findAll({
          where: {
            GroupId: req.user.GroupId
          }
        }).then(function (groceryData) {
          homeObject.grocery = groceryData;
        });
        db.Chore.findAll({
          where: {
            GroupId: req.user.GroupId,
            recurDate: homeObject.currentDay
          }
        }).then(function (choreData) {
          homeObject.chore = choreData;
          //render with the home layout passing the homeObject 
          res.render("home", homeObject);
        });
      }
      //otherwise, if the user doesn't have a GroupId send them to the page where they can request to join/create groups
      else {
        res.redirect("/groupJoin")
      }
    });

  })
  //route for page where users can join/create groups
  app.get("/groupJoin", isAuthenticated, function (req, res) {
    res.render("groupJoin");
  });




  //-----------BILL--------------------------------------------------------------

  //route to edit bills

  app.get("/bill/:creatorId/:billId", function (req, res) {
    //if the user is the creator of the bill
    var hbsObject = {
      bill: ""
    }
    var creatorId = parseInt(req.params.creatorId);
    var billId = parseInt(req.params.billId);
    if (req.user.id === creatorId) {
      db.Bill.findOne({
        where: {
          id: billId
        }
      }).then(function (billData) {
        hbsObject.bill = billData
        res.render("billEdit", hbsObject);
      });
    } else {
      res.redirect("/home");
    }
  });
  //find all bills for a given group
  app.get("/:GroupId/bills/all", isAuthenticated, function (req, res) {
    //make sure the groupId that is being accessed is coming from the group the user belongs to
    var urlGroup = parseInt(req.params.GroupId);
    if (urlGroup === req.user.GroupId) {
      var hbsObject = {
        bill: "",
        user: "",
        groupMembers: ""
      }
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then(function (userData) {
        hbsObject.user = userData;
      });
      //find all the group members in the current user's group and return their names and ids
      db.User.findAll({
        where: {
          GroupId: req.user.GroupId
        },
        attributes: ["name", "id"]
      }).then(function (membersData) {
        hbsObject.groupMembers = membersData;
      });
      db.Bill.findAll({
        where: {
          GroupId: req.user.GroupId
        }
      }).then(function (billData) {
        hbsObject.bill = billData
        res.render("allBills", hbsObject);
      });
    } else {
      res.redirect("/home");
    }
  })


  //-----------CHORE--------------------------------------------------------------
  app.get("/chore/:creatorId/:choreId", function (req, res) {
    //if the user is the creator of the chore
    var hbsObject = {
      chore: ""
    }
    var creatorId = parseInt(req.params.creatorId);
    var choreId = parseInt(req.params.choreId);
    if (req.user.id === creatorId) {
      db.Chore.findOne({
        where: {
          id: choreId
        }
      }).then(function (choreData) {
        hbsObject.chore = choreData
        res.render("choreEdit", hbsObject);
      });
    } else {
      res.redirect("/home");
    }
  });
  //find all chores for a given group
  app.get("/:GroupId/chore/all", isAuthenticated, function (req, res) {
    //make sure the groupId that is being accessed is coming from the group the user belongs to
    var urlGroup = parseInt(req.params.GroupId);
    if (urlGroup === req.user.GroupId) {
      var hbsObject = {
        chore: "",
        user: "",
        groupMembers: ""
      }
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then(function (userData) {
        hbsObject.user = userData;
      });
      //find all the group members in the current user's group and return their names and ids
      db.User.findAll({
        where: {
          GroupId: req.user.GroupId
        },
        attributes: ["name", "id"]
      }).then(function (membersData) {
        hbsObject.groupMembers = membersData;
      });
      db.Chore.findAll({
        where: {
          GroupId: req.user.GroupId
        }
      }).then(function (choreData) {
        hbsObject.chore = choreData
        res.render("allChores", hbsObject);
      });
    } else {
      res.redirect("/home");
    }
  })
  //route to get page for editing groceries
  app.get("/grocery/:groceryGroup/:groceryId", isAuthenticated, function(req, res){
    var groceryGroup = parseInt(req.params.groceryGroup);
    if (req.user.GroupId === groceryGroup){
      var hbsObject = {
        grocery: ""
      }
      var groceryId = parseInt(req.params.groceryId);
      db.Grocery.findOne({
        where:{
          id: groceryId
        }
      }).then(function (groceryData){
        hbsObject.grocery = groceryData;
        res.render("groceryEdit", hbsObject);
      })
    }
    else {
      res.redirect("/home");
    }
  })


//-----------ALL Tasks/MY Tasks---------------------------------------------------------------
  // adding route for tasks, populate all tasks/to-dos-----------------------------------------
  app.get("/mytasks", isAuthenticated, function (req, res) {
    var taskObject = {
      user: "",
      group: "",
      bill: "",
      chore: "",
      grocery: "",
      groupMembers: ""
    }
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(function(userData){
      taskObject.user = userData
    });
    //find the group
    db.Group.findOne({
      where: {
        id: req.user.GroupId
      }
    }).then(function(groupData){
      taskObject.group = groupData
    })
    db.User.findAll({
      where: {
        GroupId: req.user.GroupId
      },
      attributes: ["name", "id"]
    }).then(function (membersData) {
      taskObject.groupMembers = membersData;
    });
    //find all bill rows associated with the group
    db.Bill.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (billData) {
      taskObject.bill = billData

    })
    db.Grocery.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (groceryData) {
      taskObject.grocery = groceryData;

    })
    db.Chore.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (choreData) {
      taskObject.chore = choreData;;
      //render with the mytasks layout passing the taskObject 
      res.render("mytasks", taskObject);
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};