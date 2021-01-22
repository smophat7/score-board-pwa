var mongoose = require("mongoose");

// Incluedes Mongoose "virtuals" (lastName) in toJSON() calls
// (virtuals are not returned by res.json() and not returned by default
// when using toJSON())
const opts = { toJSON: { virtuals: true } };

// Schema to be used in the back-end/routes/members.js API routes
var MemberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateJoined: { type: Date, default: Date.now },
  profilePicture: String,
  firebaseUID: String,                                     // Links their Firebase user to their MongoDB document
  onboardingComplete: { type: Boolean, default: false },   // True if they have completed the registration onboarding process and belong to at least one group
}, opts);

MemberSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
});

mongoose.model("Member", MemberSchema);