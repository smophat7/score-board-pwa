var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const checkIfAuthenticated = require('../middleware/authentication');
var Play = mongoose.model("Play");


// Returns an array of all of the Plays
router.get("/", checkIfAuthenticated, (req, res, next) => {
  Play.find().lean().populate("game").sort({date: -1}).exec(function(err, play) {
    if (err) { return next(err); }
    res.json(play)
  });
});


// Returns one Play for detailed viewing
router.get("/:id", checkIfAuthenticated, (req, res, next) => {
  Play.findById(req.params.id, function(err, foundItem) {
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
