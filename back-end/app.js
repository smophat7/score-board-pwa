var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');                             // Use in development on local machine, don't know if I need it in production (security issue if I don't set proper whitelist)

// Connecting MongoDB / Mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/scoreboard-dev", { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection; // Suggested by https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
db.on("error", console.error.bind(console, "MongoDB connection error:")); // Suggested by https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
require("./models/Game");
require("./models/Member");


// Custom routes (mini-apps)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collectionRouter = require("./routes/collection");
var membersRouter = require("./routes/members");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());                                        // Use in development on local machine, don't know if I need it in production (security issue if I don't set proper whitelist)

// Custom routes (mini-apps)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/collection", collectionRouter);
app.use("/members", membersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
