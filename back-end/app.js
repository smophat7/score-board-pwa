var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');                             // Use in development on local machine, don't know if I need it in production (security issue if I don't set proper whitelist)
var admin = require('firebase-admin');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

// Connecting MongoDB / Mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/scoreboard-dev", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection; // Suggested by https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
db.on("error", console.error.bind(console, "MongoDB connection error:")); // Suggested by https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
require("./models/Game");
require("./models/Member");
require("./models/Group");
require("./models/Play");

// Connecting to Firebase
let serviceAccount = require("./scoreboard-e0619-firebase-adminsdk-qphdz-3f84713fd2.json");   // dev
// let serviceAccount = require("./scoreboard-e0619-firebase-adminsdk-qphdz-80d277d5d6.json");   // production
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Custom routes (mini-apps)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collectionRouter = require("./routes/collection");
var membersRouter = require("./routes/members");
var groupsRouter = require("./routes/groups");
var playsRouter = require("./routes/plays");

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

// API Swagger Documentation through Swagger-UI and Swagger-AutoGen
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Custom routes (mini-apps)
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/members", membersRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/plays", playsRouter);

// Middleware for authenticating Firebase users          //TODO If every endpoint checks for authentication, do I need it here?
//const checkIfAuthenticated = require('./middleware/authentication');
//app.use(checkIfAuthenticated);

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
