var mongoose = require("mongoose");

// Schema to be used in the back-end/routes/plays.js API routes
var PlaySchema = new mongoose.Schema({
  players: [{                                  // Array of references to Member document
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  }],
  numPlayers: Number,
  winners: [{                                  // Array of members (even if there is only 1) that were in first place
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  }],
  game: {                                      // Reference to Game document
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  },
  type: String,                                 // Matching the enumGameType defined in the front end
  points: mongoose.Schema.Types.Mixed,          // Points object can be anything (described below)
  ranking: mongoose.Schema.Types.Mixed,         // Array of arrays, each one being a grouping of members who were ranked in that place
  coopWin: Boolean,                             // true if the group won
  description: String,                          // description of the game
  date: { type: Date, default: Date.now },      // date the game was played
});


// Points object - need it to be like
// points: {
//    MongoIdOfMember: integerValueOfPoints,
//    MongoIdOfMember: integerValueOfPoints,
//    MongoIdOfMember: integerValueOfPoints,
//    .. for as many players as there are in the game
// }


mongoose.model("Play", PlaySchema);