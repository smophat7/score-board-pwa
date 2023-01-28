var mongoose = require("mongoose");

// Schema to be used in the back-end/routes/groups.js API routes
var GroupSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },      // Date the Group was created
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  }],
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  }],
  plays: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Play",
  }],
  joinCode: String,
});

mongoose.model("Group", GroupSchema);