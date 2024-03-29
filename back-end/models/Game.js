var mongoose = require("mongoose");

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

mongoose.model("Game", GameSchema);