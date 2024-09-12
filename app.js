var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var participantsRouter = require('./routes/participants');  
// Ensure case matches

const userService = require('./services/userServices');

const auth = require('./middleware/auth');

var db = require("./models/index");
db.sequelize.sync({ force: false })
  .then(async () => {
    console.log('Database connected successfully');

    // Admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'P4ssword';

    // Check if the admin user already exists
    const existingAdmin = await userService.findUserByUsername(adminUsername);
    if (!existingAdmin) {
      await userService.createUser(adminUsername, adminPassword);
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
app.use('/participants', auth, participantsRouter);  // Protect /participants with auth middleware
app.use('/', indexRouter);  // Public routes (if any)
app.use('/users', usersRouter);  // Public or protected routes for users

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
