var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Play = mongoose.model("Play");
var Group = mongoose.model("Group");
const checkIfAuthenticated = require('../middleware/authentication');


// Returns an array of Plays by finding the group specified by the parameter id and finding its Plays (w/ deep .populate() syntax to populate deeper levels for each Play)
router.get("/:id", checkIfAuthenticated, (req, res, next) => {
  Group.findById(req.params.id).populate({
    path : 'plays',
    populate : {
      path : 'game',
    },
  }).populate({
    path : 'plays',
    populate : {
      path : 'players',
    },
  }).populate({
    path : 'plays',
    populate : {
      path : 'winners',
    },
  }).exec(function(err, group) {
    if (err) { return next(err); }
    res.json(group.plays);
  });
});


// // Returns an array of all of the Plays
// router.get("/", checkIfAuthenticated, (req, res, next) => {
//   Play.find().lean().populate("game").sort({date: -1}).exec(function(err, play) {
//     if (err) { return next(err); }
//     res.json(play)
//   });
// });


// Returns one Play for detailed viewing
router.get("/single/:id", checkIfAuthenticated, (req, res, next) => {
  // Play.findById(req.params.id, function(err, foundItem) {
  //   if (err) { return next(err); }
  //   res.json(foundItem);
  // });
  Play.findById(req.params.id).populate("game").populate("players").populate("winners").exec(function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


// Saves a new Play to the DB and returns the newly created Play
router.post("/", checkIfAuthenticated, (req, res, next) => {
  let newPlay = new Play(req.body);
  newPlay.save(function(err, play) {
    if (err) { return next(err); }
    res.json(play);
  });
});


// Saves a new Play to the DB, adds it to the current group, and sends back the newly created Play
router.post("/:groupId", checkIfAuthenticated, (req, res, next) => {
  let newPlay = new Play(req.body);

  // Save new Play
  newPlay.save(function(err, play) {
    if (err) { return next(err); }
  });
  
  // Add new Play to the Group
  Group.findByIdAndUpdate(req.params.groupId, {$push: {plays: newPlay._id}}, { new: true }, function(err, foundItem) {
    if (err) {
      console.log("err:" + err)
      return next(err);
    }
  });

  res.send(newPlay);
});



// Deletes a Play permanently from the database and sends back the deleted Play
router.delete("/:id", checkIfAuthenticated, (req, res, next) => {
  Play.findByIdAndDelete(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


// Deletes all the plays that reference the given Member id and returns confirmation
router.delete("/fromMembers/:id", checkIfAuthenticated, (req, res, next) => {
  Play.deleteMany({ players: req.params.id }, function(err, result) {
    if (err) { return next(err); }
    res.json(result);
  });
});


// Deletes all the plays that reference the given Game id and returns confirmation
router.delete("/fromGames/:id", checkIfAuthenticated, (req, res, next) => {
  Play.deleteMany({ game: req.params.id }, function(err, result) {
    if (err) { return next(err); }
    res.json(result);
  });
});


module.exports = router;
