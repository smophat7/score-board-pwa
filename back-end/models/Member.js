var mongoose = require("mongoose");

// Schema to be used in the back-end/routes/members.js API routes
var MemberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  dateJoined: { type: Date, default: Date.now },
  profilePicture: String,
  firebaseUID: String,                                     // Links their Firebase user to their MongoDB document
  onboardingComplete: { type: Boolean, default: false },   // True if they have completed the registration onboarding process and belong to at least one group
});

mongoose.model("Member", MemberSchema);