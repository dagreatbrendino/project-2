var db = require("../models");

module.exports = function(app) {
  //Finds all bills
  app.get("tasks/bills", function(req, res) {
    db.bill.findAll({}).then(function(dbbill) {
      res.json(dbbill);
    });
  });


//CREATE----------------------------------------------------------
  app.post("tasks/bills", function(req, res) {
    console.log(req.body);
    db.bill.create(req.body).then(function(dbbill) {
      res.json(dbbill);
    });
  });

//DELETE----------------------------------------------------------
  app.delete("tasks/bills/:id", function(req, res) {
    db.bill.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbbill) {
      res.json(dbbill);
    });
  });

};
