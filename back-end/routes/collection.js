var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Game = mongoose.model("Game");
var Group = mongoose.model("Group");
const checkIfAuthenticated = require('../middleware/authentication');


// Returns an array of Games by finding the group specified by the parameter id and finding its Games
router.get("/:id", checkIfAuthenticated, (req, res, next) => {
  Group.findById(req.params.id).populate("games").exec(function(err, group) {
    if (err) { return next(err); }
    res.json(group.games);
  });
});

// Returns all Games
// router.get("/", checkIfAuthenticated, (req, res, next) => {
//   Game.find(function(err, games) {
//     if (err) { return next(err); }
//     res.json(games);
//   });
// });


// Returns one Game for detailed viewing
router.get("/single/:id", checkIfAuthenticated, (req, res, next) => {
  Game.findById(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


// Saves a new Game to the DB, adds it to the current group, and sends back the newly created Game
router.post("/:groupId", checkIfAuthenticated, (req, res, next) => {
  let newGame = new Game(req.body);

  // Save new Game
  newGame.save(function(err, game) {
    if (err) { return next(err); }
  });
  
  Group.findByIdAndUpdate(req.params.groupId, {$push: {games: newGame._id}}, { new: true }, function(err, foundItem) {
    if (err) {
      console.log("err:" + err)
      return next(err);
    }
  });

  res.send(newGame);
});

// // Saves a new Game to the DB and returns the newly created Game
// router.post("/", checkIfAuthenticated, (req, res, next) => {
//   let newGame = new Game(req.body);
//   newGame.save(function(err, game) {
//     if (err) { return next(err); }
//     res.json(game);
//   });
// });


// Deletes a Game permanently from the database and sends back the deleted Game
router.delete("/:id", checkIfAuthenticated, (req, res, next) => {
  Game.findByIdAndDelete(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


// Updates a Game and sends back the updated version (because "{ new: true }")
router.put("/:id", checkIfAuthenticated, (req, res, next) => {
  Game.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


module.exports = router;
