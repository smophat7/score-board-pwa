var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Member = mongoose.model("Member");

// Must use toJSON() instead of res.json() in order to have virtuals returned (lastName in this case)


// // Middleware for a :member parameter in other route
// router.param("member", function(req, res, next, id) {
//   let query = Member.findById(id);
//   query.exec(function(err, comment) {
//     if (err) { return next(err); }
//     if (!member) { return next(new Error("Can't find mem by id")); }
//     req.member = member;
//     return next();
//   });
// });


// Sends back an array of Members
router.get("/", (req, res, next) => {
  Member.find(function(err, members) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(members)));  // Should be able to do just res.send(toJSON(members)); but it said toJSON() is not a function
    // console.log(games.toJSON().fullName);
  });
});


// Saves a new Member to the DB and sends back the newly created Member
router.post("/", (req, res, next) => {
  let newMember = new Member(req.body);
  newMember.save(function(err, member) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(member)));  // Should be able to do just res.send(toJSON(members)); but it said toJSON() is not a function
  });
});


// Deletes a Member permanently from the database and sends back the deleted Member
router.delete("/:id", (req, res, next) => {
  Member.findByIdAndDelete(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(foundItem)));
  });
});

router.put("/:id", (req, res, next) => {
  Member.findByIdAndUpdate(req.params.id, req.body, function(err, foundItem) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(foundItem)));
  });
});


module.exports = router;