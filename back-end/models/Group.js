var mongoose = require("mongoose");

// Schema to be used in the back-end/routes/groups.js API routes
var GroupSchema = new mongoose.Schema({
  name: String,                                 // Name of the Group
  date: { type: Date, default: Date.now },      // Date the Group was created
  members: [{                                   // Array of Members (even if there is only 1) in the Group
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  }],
  games: [{                                     // Array of Games
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  }],
  plays: [{                                     // Array of Plays
    type: mongoose.Schema.Types.ObjectId,
    ref: "Play",
  }],
  joinCode: String,
});

mongoose.model("Group", GroupSchema);