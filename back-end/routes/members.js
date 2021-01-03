var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Member = mongoose.model("Member");
const checkIfAuthenticated = require('../middleware/authentication');

// Must use toJSON() instead of res.json() in order to have virtuals returned (lastName in this case)


// Sends back an array of Members
router.get("/", checkIfAuthenticated, (req, res, next) => {
  Member.find(function(err, members) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(members)));  // Should be able to do just res.send(toJSON(members)); but it said toJSON() is not a function
  });
});


// Returns member with certain Firebase UID
router.get("/firebase/:uid", checkIfAuthenticated, (req, res, next) => {
  Member.findOne({ firebaseUID: req.params.uid }, function(err, member) {
    if (err) { return next(err); }
    console.log("findOne:" + member);
    res.json(member);
  });
});


// Returns one Member for detailed viewing
router.get("/:id", checkIfAuthenticated, (req, res, next) => {
  Member.findById(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


// Saves a new Member to the DB and sends back the newly created Member
router.post("/", checkIfAuthenticated, (req, res, next) => {
  let newMember = new Member(req.body);
  newMember.save(function(err, member) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(member)));  // Should be able to do just res.send(toJSON(members)); but it said toJSON() is not a function
  });
});


// Deletes a Member permanently from the database and sends back the deleted Member
router.delete("/:id", checkIfAuthenticated, (req, res, next) => {
  Member.findByIdAndDelete(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(foundItem)));
  });
});


// Updates a Member and sends back the updated version (because "{ new: true }")
router.put("/:id", checkIfAuthenticated, (req, res, next) => {
  Member.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, foundItem) {
    if (err) { return next(err); }
    res.send(JSON.parse(JSON.stringify(foundItem)));
  });
});


module.exports = router;