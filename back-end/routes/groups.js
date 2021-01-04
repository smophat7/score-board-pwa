var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const checkIfAuthenticated = require('../middleware/authentication');
var Group = mongoose.model("Group");


// Returns an array of Groups the user is in (:id is user's Member id, not Firebase)
router.get("/:id", checkIfAuthenticated, (req, res, next) => {
  Group.find({ members: req.params.id }, function(err, groups) {
    if (err) { return next(err); }
    res.json(groups);
  });
});

// Returns an array of Members in the given Group (:id is the Group Id)
router.get("/:id/members", checkIfAuthenticated, (req, res, next) => {
  Group.findById(req.params.id).populate("members").exec(function(err, group) {
    if (err) { return next(err); }
    console.log(group);
    console.log(group.members);
    res.json(group.members);
  });
});


// // Returns one Game for detailed viewing
// router.get("/:id", (req, res, next) => {
//   Game.findById(req.params.id, function(err, foundItem) {
//     if (err) { return next(err); }
//     res.json(foundItem);
//   });
// });


// Saves a new Group to the DB and returns the newly created Group
router.post("/", checkIfAuthenticated, (req, res, next) => {
  let newGroup = new Group(req.body);
  newGroup.save(function(err, group) {
    if (err) { return next(err); }
    res.json(group);
  });
});


// // Deletes a Game permanently from the database and sends back the deleted Game
// router.delete("/:id", (req, res, next) => {
//   Game.findByIdAndDelete(req.params.id, function(err, foundItem) {
//     if (err) { return next(err); }
//     res.json(foundItem);
//   });
// });


// Adds Member to a Group and sends back the updated version of the Group (because "{ new: true }")
router.put("/addMemberToGroup/:id", (req, res, next) => {
  Group.findByIdAndUpdate(req.params.id, {$push: {members: req.body._id}}, { new: true }, function(err, foundItem) {
    if (err) { return next(err); }
    console.log(foundItem);
    res.json(foundItem);
  });
});


module.exports = router;