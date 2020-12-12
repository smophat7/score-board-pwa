var mongoose = require("mongoose");
// var Play = require("../routes/plays.js");
// var Play = require("./Play.js");
// var Plays = require("../routes/plays.js");
// var PlaySchema = mongoose.model('Play').schema;

// Schema to be used in the back-end/routes/collection.js API routes
var GameSchema = new mongoose.Schema({
  // id: String,
  board_game_id: String,          // was the id from the API but renamed for clarity in MongoDB
  name: String,                   // defaults as the name from the API but can be overriden by the user
  name_original: String,          // the name from the BoardGame Atlas API
  year_published: Number,
  min_players: Number,
  max_players: Number,
  min_playtime: Number,
  max_playtime: Number,
  min_age: Number,
  description: String,
  description_preview: String,
  image_url: String,
  thumb_url: String,
  images: { thumb: String, small: String, medium: String, large: String, original: String },
  url: String,
  price: String,
  msrp: String,
  discount: String,
  primary_publisher: String,
  // publishers: [String],
  // mechanics: [{ id: String, url: String }],
  // categories: [{ id: String, url: String }],
  // designers: [String],
  developers: [String],
  artists: [String],
  names: [String],
  num_user_ratings: Number,
  average_user_rating: Number,
  official_url: String,
  rules_url: String,
  // matches_specs: { id: String },
  // spec: Array,
  reddit_all_time_count: Number,
  reddit_week_count: Number,
  reddit_day_count: Number,
  historical_low_price: Number,
  historical_low_date: String,
  rank: Number,
  trending_rank: Number,
});


// Delete function pre/middleware (deletes all plays that reference the game to be deleted)
GameSchema.pre('findOneAndDelete', async function(next) {
  // console.log("in the pre-hook!");
  // console.log(this._conditions._id);
  // console.log(this.id);

  // Play.find(function(err, games) {
  //   if (err) { return next(err); }
  //   res.json(games);
  // });
  
  // await this.model("Play").find(function(err, plays) {
  //   console.log("in the Play.find()");
  //   if (err) { return next(err); }
  //   console.log(plays);
  // });

  // await this.model("Plays").deleteMany({ _id: this._conditions._id }, function(err, result) {
  //   console.log("in the await deleteMany() function!");
  //   if (err) { return next(err); }
  //   console.log(result);
  // });

  next();
});


// // Delete function pre/middleware (deletes all plays that reference the game to be deleted)
// GameSchema.pre('findOneAndDelete', async function() {
//   console.log("in the pre-hook!");
//   // console.log(Play);
//   // console.log(this);
//   // console.log(this.model("Play"));

//   // console.log(mongoose.models.Play);
//   // console.log(mongoose.modelSchemas.Play);
  
//   // Play.find(function(err, plays) {
//   // this.model("Play").find(function(err, plays) {
//   //   console.log("in the Play.find()");
//   //   if (err) { return next(err); }
//   //   console.log(plays);
//   // });

//   // await Play.deleteMany({ _id: ObjectId(this.id) }, function(err, result) {
//   await mongoose.modelSchemas.Play.deleteMany({ _id: ObjectId(this.id) }, function(err, result) {
//     console.log("in the await deleteMany() function!");
//     if (err) { return next(err); }
//     console.log(result);
//   });
// });

// error handling??


mongoose.model("Game", GameSchema);