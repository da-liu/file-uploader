// set up ======================================================================
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var jqupload      = require('jquery-file-upload-middleware');
var mongoose      = require('mongoose');
var passport      = require('passport');
var session       = require('express-session');
var flash         = require('connect-flash');

// configuration ===============================================================
var credentials   = require('./config/credentials.js');
var configDB      = require('./config/database.js')
mongoose.connect(configDB.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credentials.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: credentials.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
var index     = require('./routes/index');
var users     = require('./routes/users');
var analysis  = require('./routes/analysis')
var upload    = require('./routes/upload');


app.use('/', index);
app.use('/users', users);
app.use('/analysis', analysis);
app.use('/upload', upload);

app.use('/upload', function(req, res, next) {
  var now = Date.now();
  jqupload.fileHandler({
    uploadDir: function() {
      return __dirname + '/public/uploads/' + now;
    },
    uploadUrl: function() {
      return '/uploads/' + now;
    }
  })(req, res, next);
})

require('./config/passport')(passport);
require('./routes/auth.js')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
