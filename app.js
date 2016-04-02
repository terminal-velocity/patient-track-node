var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('my-application');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var routes = require('./routes/index');
var users = require('./routes/users');
var editor = require('./routes/editor');
var admin = require('./routes/admin');

var app = express();

// port setup
app.set('port', process.env.PORT || 3000);
app.set('dburl', process.env.DBURL || "genericurl");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* NEW MONGODB SETUP */
// DOCS ARE HERE https://github.com/mongodb/node-mongodb-native/blob/master/Readme.md
// And
/*app.use(function (req, res, next){
 MongoClient.connect(app.get('dburl'), function(err, db) {
   if(err) throw err;
   req.db = db;
   req.ObjectId = mongodb.ObjectID;
   next();
 });
});
/* END MONGODB SETUP */

app.use('/', routes);
app.use('/', admin);
app.use('/users', users);
app.use('/editor', editor);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
