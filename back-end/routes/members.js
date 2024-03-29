var express = require('express');
var _ = require('lodash');
var router = express.Router();
var mongoose = require("mongoose");
var Member = mongoose.model("Member");
var Group = mongoose.model("Group");
var Play = mongoose.model("Play");
const checkIfAuthenticated = require('../middleware/authentication');


// Must use toJSON() instead of res.json() in order to have virtuals returned (lastName in this case)


// // Returns an array of Members by finding the group specified by the parameter id and finding its Members
// router.get("/:id", checkIfAuthenticated, (req, res, next) => {
//   Group.findById(req.params.id).populate("members").exec(function(err, group) {
//     if (err) { return next(err); }
//     res.json(group.members);
//   });
// });

// Returns an array of Members by finding the group specified by the parameter id and finding its Members (also calculates play/win counts/percentages and includes those)
router.get("/:id", checkIfAuthenticated, (req, res, next) => {
  Group.findById(req.params.id).populate("members").lean().exec(async function(err, group) {          // .lean() returns an POJO instead so I can add attributes
    if (err) { return next(err); }
    // Calculate play/win counts/percentages for each member and return that as part of the object
    for (const member of group.members) {
      // Calculate play count                                                               //TODO: restrict stats to current group only
      await Play.countDocuments({ players: member._id }, function(err, count) {
        if (err) { return next(err); }
        member['numPlays'] = count;
      });
      // Calculate win count                                                                //TODO: restrict stats to current group only
      await Play.countDocuments({ winners: member._id }, function(err, count) {
        if (err) { return next(err); }
        member['numWins'] = count;
      });
      // Win percentage                                                                     //TODO: restrict stats to current group only
      member['winRate'] = member['numWins'] / member['numPlays'];
    }
    res.json(group.members);
  });
});


// Returns member with certain Firebase UID
router.get("/firebase/:uid", checkIfAuthenticated, (req, res, next) => {
  Member.findOne({ firebaseUID: req.params.uid }, function(err, member) {
    if (err) { return next(err); }
    res.json(member);
  });
});


// Returns one Member for detailed viewing
router.get("/single/:id", checkIfAuthenticated, (req, res, next) => {
  Member.findById(req.params.id).lean().exec(async function(err, member) {
    if (err) { return next(err); }
    await Play.countDocuments({ players: member._id }, function(err, count) {
      if (err) { return next(err); }
      member['numPlays'] = count;
    });
    await Play.countDocuments({ winners: member._id }, function(err, count) {
      if (err) { return next(err); }
      member['numWins'] = count;
    });
    member['winRate'] = member['numWins'] / member['numPlays'];
    res.json(member);
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

// Saves a new Member to the DB, adds them to the current group, and sends back the newly created Member
router.post("/:groupId", checkIfAuthenticated, (req, res, next) => {
  let newMember = new Member(req.body);

  // Save new Member
  newMember.save(function(err, member) {
    if (err) { return next(err); }
  });
  
  Group.findByIdAndUpdate(req.params.groupId, {$push: {members: newMember._id}}, { new: true }, function(err, foundItem) {
    if (err) {
      console.log("err:" + err)
      return next(err);
    }
  });

  res.send(newMember);
});


// // Registers a new member in one call. Creates the member object, adds a
// // new group with them in it. Returns the new Member.
// router.post("/register", checkIfAuthenticated, (req, res, next) => {
//   console.log("in the register thing");
//   let newMember = new Member(req.body);
//   console.log("created new Member object!");

  

//   // Create a new groupo with the new Member in it
//   let newGroup = new Group({
//     name: newMember.firstName + "'s Group",
//     members: [],
//     joinCode: Math.random().toString(36).substr(2, 8).toUpperCase(),          // Randomly generated all-caps alphanumeric string, 8-chars
//   });
  
//   console.log("saved new Member: " + JSON.stringify(newMember));
//   newGroup.save(function(err, group) {
//     if (err) { return next(err); }
//   });
//   console.log("saved new Group");

//   Group.findByIdAndUpdate(newGroup._id, {$push: {members: newMember._id}}, { new: true }, function(err, foundItem) {
//     if (err) {
//       console.log("err:" + err)
//       return next(err);
//     }
//   });

//   res.send(newGroup);
// });


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


// Sets the specific Member's 'onboardingComplete' boolean to true and sends back the updated version (because "{ new: true }")
router.put("/onboardingStatus/:id", checkIfAuthenticated, (req, res, next) => {
  Member.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, foundItem) {
    if (err) { console.log(err); return next(err); }
    res.send(JSON.parse(JSON.stringify(foundItem)));
  });
});


module.exports = router;