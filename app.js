var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var studentRouter = require('./routes/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Static declaration
app.use(express.static(path.join(__dirname, 'public')));

//Admin Static Declaration
app.use('/scripts', express.static(path.join(__dirname, 'public/assets/scripts')));
app.use('/images', express.static(path.join(__dirname, 'public/assets/images')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

//Dynamic Routing
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/dashboard/student', studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;