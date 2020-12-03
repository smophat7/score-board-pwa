var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Member = mongoose.model("Member");

// Must use toJSON() instead of res.json() in order to have virtuals returned (lastName in this case)


// Returns an array of Members
router.get("/", (req, res, next) => {
  Member.find(function(err, members) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(members)));  // Should be able to do just res.send(toJSON(members)); but it said toJSON() is not a function
    // console.log(games.toJSON().fullName);
  });
});


// Saves a new Member to the DB and returns the newly created Member
router.post("/", (req, res, next) => {
  let newMember = new Member(req.body);
  newMember.save(function(err, member) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(member)));  // Should be able to do just res.send(toJSON(members)); but it said toJSON() is not a function
  });
});

module.exports = router;