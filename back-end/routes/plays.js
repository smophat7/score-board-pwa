var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Play = mongoose.model("Play");


// Returns an array of all of the Plays
router.get("/", (req, res, next) => {
  Play.find().lean().populate("game").exec(function(err, play) {
    if (err) { return next(err); }
    console.log(play);
    res.json(play)
  });
});


// Saves a new Play to the DB and returns the newly created Play
router.post("/", (req, res, next) => {
  let newPlay = new Play(req.body);
  console.log("newPlay in plays.js route: " + newPlay);
  newPlay.save(function(err, play) {
    console.log("inside save, before if (err)");
    if (err) { return next(err); }
    // console.log("play.json() = " + play.json());
    res.json(play);
  });
});


// Deletes a Play permanently from the database and sends back the deleted Play
router.delete("/:id", (req, res, next) => {
  Play.findByIdAndDelete(req.params.id, function(err, foundItem) {
    if (err) { return next(err); }
    res.json(foundItem);
  });
});


module.exports = router;