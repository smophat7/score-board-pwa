var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Game = mongoose.model("Game");


// Returns an array of Games (the collection)
router.get("/", (req, res, next) => {
  Game.find(function(err, games) {
    if (err) { return next(err); }
    res.json(games);
  });
});

// Saves a new Game to the DB and returns the newly created Game
router.post("/", (req, res, next) => {
  let newGame = new Game(req.body);
  newGame.save(function(err, game) {
    if (err) { return next(err); }
    res.json(game);
  });
});


// Deletes a Game permanently from the database and sends back the deleted Game
// There's some pre middleware that removes all associated plays defined in Game.js
// before the mongoose.model();
router.delete("/:id", (req, res, next) => {
  // if (req.params.id == null) {
  //   console.log("404 on its way!");
  //   res.sendStatus(404);
  // }

  // Delete the recorded game itself
  Game.findByIdAndDelete(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


// Updates a Game and sends back the updated version (because "{ new: true }")
router.put("/:id", (req, res, next) => {
  Game.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


module.exports = router;
