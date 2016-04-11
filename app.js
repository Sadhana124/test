var express = require('express');
var app = express();
var http = require("http");

// view engine setup
app.set('port', process.env.port || 3000);

/*var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require("http");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.port || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handlers

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

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port" + app.get('port'));
});

//creating sqlite db and connecting to it


// Require the sqlite3 library. Use the 'verbose()'-flag to show stack traces while running queries.
var sqlite3     = require('sqlite3').verbose();
var fs          = require('fs');

// Setup database:
var dbFile = './database.db';
var dbExists = fs.existsSync(dbFile);

// If the database doesn't exist, create a new file:
if(!dbExists)
{
    fs.openSync(dbFile, 'w');
}

// Initialize the database:
var db = new sqlite3.Database(dbFile);



//error handling of db - did not work
db.on('error', function(err){
    // handle the error safely
    console.log(err)
})

// Optional installation for newly created databases:

try {

    //drop the table if it already exists:
    db.run('DROP TABLE IF EXISTS table_name');
    db.run('DROP TABLE IF EXISTS table_name2');

//create the table
    db.run('CREATE TABLE my_table2 (' +
        'rowId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
        'randomInt INTEGER)');
    /*if(!dbExists)
     {
     /*db.run('CREATE TABLE `my_table` (' +
     '`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
     '`name` TEXT,' +
     '`email` TEXT,' +
     '`number` INTEGER,' +
     '`extra` TEXT)');*/
    /*db.run('CREATE TABLE my_table (' +
     'rowId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
     'randomInt INTEGER');
     }*/

// Insert some data using a statement:
    var statement = db.prepare('INSERT INTO my_table2 (randomInt) ' +
        'VALUES (?)');

//insert random data for 10 rows
    var rnd;
    for (var i = 0; i < 10; i++) {
        rnd = Math.floor(Math.random() * 10000);
        statement.run(rnd);
    }
//statement.run('My name', 'some@example.com', Math.round(Math.random() * 1000), 'Extra information');
    statement.finalize();

//display the db to check insert and create of db
    db.each("SELECT rowId AS id, randomInt FROM my_table2", function(err, row) {
        console.log(row.id + ": " + row.randomInt);
    });

// Close the database:
    db.close();

} catch(err) {
    console.trace(err);
}






module.exports = app;




